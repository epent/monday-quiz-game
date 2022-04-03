import axios from "axios";
export async function handler(event, context) {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=100");
    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify(err.message), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
