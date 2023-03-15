import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const authCookieToken = req.cookies.get(
        process.env.AUTH_COOKIE_NAME ?? ""
    )?.value;

    const pathname = req.nextUrl.pathname;

    if (authCookieToken && pathname === "/api/auth/login") {
        return new NextResponse(
            JSON.stringify({
                success: false,
                error: "You are already logged in...",
            }),
            {
                status: 400,
            }
        );
    }

    return NextResponse.next();
}
