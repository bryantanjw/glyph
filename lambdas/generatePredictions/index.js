/**
 * Lambda Function: generatePredictions
 *
 * This function initiates the image generation generation process
 * by making a POST request to the Replicate API.
 *
 * Input:
 * - event.body: Contains parameters for the prediction process.
 *   {
 *     prompt,
 *     url,
 *     negativePrompt,
 *     inferenceStep,
 *     guidance,
 *     strength,
 *     controlnetConditioning,
 *     seed
 *   }
 *
 * Output:
 * - Success: Returns a status 'polling' with a URL to poll for the result.
 * - Error: Returns an error status and message.
 *
 * Dependencies:
 * - Replicate API
 *
 * Rate Limiting:
 * - The function uses a rate limiter to control the number of requests.
 * - The rate limiter allows 10 requests per 10 minutes.
 * - If the rate limit is exceeded, the function returns an error with status code 429 (Too Many Requests).
 *
 * Error Handling:
 * - Returns appropriate error messages based on the Replicate API response or any internal errors.
 */

const Ratelimit = require("@upstash/ratelimit").Ratelimit;
const redis = require("./utils/redis");

// Create a new ratelimiter, that allows 5 requests per 30 minutes
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "30 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const req = JSON.parse(event.body);
    console.log("req " + req);
    const {
      prompt,
      url,
      negativePrompt,
      inferenceStep,
      guidance,
      strength,
      controlnetConditioning,
      seed,
    } = req;

    // Use a constant string to limit all requests with a single ratelimit
    // Or use a userID, apiKey or ip address for individual limits.
    const identifier = "ip address";
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "You've exceeded your tier limit. Please try again later.",
        }),
      };
    }

    // POST request to Replicate to start the image restoration generation process
    let startResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
        body: JSON.stringify({
          version:
            "9cdabf8f8a991351960c7ce2105de2909514b40bd27ac202dba57935b07d29d4",
          input: {
            prompt,
            qr_code_content: url,
            negative_prompt: negativePrompt,
            num_inference_steps: inferenceStep,
            guidance_scale: guidance,
            seed,
            strength,
            controlnet_conditioning_scale: controlnetConditioning,
            batch_size: 1,
          },
        }),
      }
    );

    if (!startResponse.ok) {
      throw new Error(`HTTP error! status: ${startResponse.status}`);
    }

    let jsonStartResponse = await startResponse.json();
    let endpointUrl = jsonStartResponse.urls.get;

    // Return immediately with a "polling" status and the URL to poll for the result
    if (endpointUrl) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: "polling",
          url: endpointUrl,
        }),
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Endpoint URL is not available.",
        }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "error",
        message: error.message,
      }),
    };
  }
};
