import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { COOKIE_ERROR_KEY } from "./constants/config";
import ROUTER from "./constants/router";

export function middleware(request: NextRequest) {
  const articleId = request.nextUrl.pathname.split(`${ROUTER.EDIT_ARTICLE}/`)[1];

  if (isNaN(Number(articleId))) {
    const response = NextResponse.redirect(new URL(ROUTER.HOME, request.url));
    response.cookies.set(COOKIE_ERROR_KEY, "유효하지 않는 링크에요");
    return response;
  }
}

export const config = {
  matcher: ["/links/edit/:path*"],
};
