/**
 * Lambda Function: pollPredictions
 *
 * This function polls the status of an image generation process
 * by making a GET request to the Replicate API using a provided prediction ID.
 *
 * Input:
 * - event.pathParameters.id: Contains the prediction ID used to poll the status.
 *
 * Output:
 * - Success: Returns the current status of the prediction, which can be 'succeeded', 'failed', or 'in-progress'.
 * - Error: Returns an error status and message.
 *
 * Dependencies:
 * - Replicate API
 *
 * Error Handling:
 * - Returns appropriate error messages based on the Replicate API response or any internal errors.
 * - Handles scenarios where the Replicate API returns a non-200 status code.
 */

exports.handler = async (event) => {
  // Standard headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    // Extracting the prediction ID from the path parameter
    console.log("pollingPredictions event", event);
    const predictionId = event.pathParameters.id;

    // GET request to Replicate to get the status of the prediction
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseData),
    };
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
