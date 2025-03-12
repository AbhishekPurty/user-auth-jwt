import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("userToken");
  const pathname = request.nextUrl.pathname;

  if (token) {
    try {
      const tokenValue = token.value; // Extract token value
      const apiUrl = new URL("/api/verify-token", request.url);

      // Call the API to verify the token
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenValue }),
      });

      if (response.status === 200) {
        const { decoded } = await response.json();
        console.log("Valid token:", decoded);

        // Prevent access to login/signup for logged-in users
        if (pathname === "/login" || pathname === "/signup") {
          return NextResponse.redirect(new URL("/", request.url));
        }
      } else {
        // Token is invalid (e.g., tampered with or expired)
        console.warn("Invalid token detected. Logging out user.");
        const errorData = await response.json();
        console.error("Verification error:", errorData);

        // Redirect to login and clear the tampered cookie
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.set("userToken", "", { path: "/", maxAge: 0 }); // Clear token
        return response;
      }
    } catch (err) {
      // Verification or network error
      // console.error("Error during token verification:", err);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("userToken", "", { path: "/", maxAge: 0 }); // Clear token
      return response;
    }
  } else {
    // User is not logged in and tries to access a restricted route
    if (pathname !== "/login" && pathname !== "/signup") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!verify-email|api|_next/static|_next/image|favicon.ico).*)"],
};
