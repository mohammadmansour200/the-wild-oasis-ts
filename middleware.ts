// import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
// 	return NextResponse.redirect(new URL("/about", req.url));
// }

import { auth } from "@/app/_lib/auth";
import { MiddlewareConfig } from "next/server";
export const middleware = auth;

export const config: MiddlewareConfig = {
	matcher: ["/account"],
};
