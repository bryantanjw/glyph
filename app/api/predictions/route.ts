import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

export async function POST(request: Request) {
  if (!request) {
    throw new Error("Request object is undefined");
  }

  // Rate Limiter Code
  if (ratelimit) {
    const headersList = headers();
    const ipIdentifier = headersList.get("x-real-ip");

    const result = await ratelimit.limit(ipIdentifier ?? "");

    if (!result.success) {
      return new Response(
        "Too many uploads in 1 day. Please try again in a 24 hours.",
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit,
            "X-RateLimit-Remaining": result.remaining,
          } as any,
        }
      );
    }
  }

  const req = await request.json(); // Parse the request body once

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

  console.log("req", req);

  // POST request to Replicate to start the image restoration generation process
  console.log("Start /predictions POST request");
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
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
  });

  if (!startResponse.ok) {
    throw new Error(`HTTP error! status: ${startResponse.status}`);
  }
  let jsonStartResponse = await startResponse.json();
  console.log("jsonStartResponse", jsonStartResponse);

  let endpointUrl = jsonStartResponse.urls.get;

  // // GET request to get the status of the image restoration process & return the result when it's ready
  let predictions: string | null = null;
  while (!predictions) {
    // Loop in 1s intervals until the alt text is ready
    console.log("Polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      predictions = jsonFinalResponse;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return NextResponse.json(predictions ?? "Failed to generate image.");
}
