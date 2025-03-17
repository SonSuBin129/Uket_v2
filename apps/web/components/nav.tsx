"use client";

import { cn } from "@uket/ui/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "./logo-icon";
import Profile from "./profile";

// TODO: Profile 컴포넌트 추가 및 Error Boundary 적용
const PATHS = {
  HOME: new Set(["/", "/home"]),
  AUTH_RELATED: new Set(["/buy-ticket", "/my-info", "/signup"]),
  REGISTERED: new Set([
    "/",
    "/home",
    "/buy-ticket",
    "/my-info",
    "/login",
    "/signup",
    "/select-event",
    "/ticket",
  ]),
} as const;

const Nav = () => {
  const pathname = usePathname();

  const isHome =
    PATHS.HOME.has(pathname) || /^\/home\/[^/]+\/[^/]+$/.test(pathname);

  return (
    isHome && (
      <header
        className={cn(
          "left-0 top-0 z-10 container",
          pathname === "/" ? "absolute" : "bg-white",
        )}
      >
        <nav
          className={cn(
            "my-2 flex h-10 w-full items-center justify-between self-stretch",
          )}
        >
          <>
            <Link href="/">
              <div className="relative">
                <LogoIcon isRoot={pathname === "/"} />
              </div>
            </Link>
            <Profile />
          </>
        </nav>
      </header>
    )
  );
};

export default Nav;
