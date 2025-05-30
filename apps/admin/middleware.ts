import { NextRequest, NextResponse, userAgent } from "next/server";

type RouteHandler = (
  request: NextRequest,
  isMobileDevice: boolean,
) => NextResponse | undefined;

const handleRootRoute: RouteHandler = (request, isMobileDevice) => {
  const isAuthorized = request.cookies.get("admin-accessToken");

  if (!isAuthorized) return NextResponse.next();

  return NextResponse.redirect(
    new URL(
      isMobileDevice ? "/qr-scan" : "/event-manage",
      request.nextUrl.origin,
    ),
  );
};

const handleProtectedRoutes: RouteHandler = (request, isMobileDevice) => {
  const isAuthorized = request.cookies.get("admin-accessToken");

  if (!isAuthorized) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  if (!isMobileDevice && request.nextUrl.pathname === "/qr-scan") {
    return NextResponse.redirect(
      new URL("/event-manage", request.nextUrl.origin),
    );
  }

  return undefined;
};

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const isMobileDevice = device?.type === "mobile";

  if (request.nextUrl.pathname === "/") {
    return handleRootRoute(request, isMobileDevice) ?? NextResponse.next();
  }

  if (request.nextUrl.pathname === "/signup") {
    const hasEmail = request.nextUrl.searchParams.has("email");
    if (!hasEmail) {
      return NextResponse.rewrite(
        new URL("/not-found", request.nextUrl.origin),
      );
    }
    return NextResponse.next();
  }

  return handleProtectedRoutes(request, isMobileDevice) ?? NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
