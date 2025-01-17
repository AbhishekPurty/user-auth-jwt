export async function POST(req) {
    // Clear the HTTP-only cookie
    const res = new Response(null, {
      status: 307,
      headers: {
        "Set-Cookie": "userToken=; path=/; HttpOnly; max-age=0;",
        "Location": "/login", // Redirect to login page
      },
    });
    return res;
  }
  