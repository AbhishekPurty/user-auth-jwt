import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const body = await request.json();
    const { tokenValue: token } = body;

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) throw new Error("SECRET_KEY is not defined");

    const decoded = jwt.verify(token, secretKey);
    return new Response(
      JSON.stringify({ valid: true, decoded }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return new Response(
      JSON.stringify({ valid: false, error: err.message }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
