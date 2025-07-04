"use client";

import { useQueryAdminInfo } from "@uket/api/queries/admin-user";
import { cn } from "@uket/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINK_LIST, SUPER_ADMIN_NAV_LINK_LIST } from "../constants/link";
import AdminLogo from "./admin-logo";
import GreetingHeader from "./greeting-header";
import HelperMenu from "./HelperMenu";

function NavLink({ href, title }: { href: string; title: string }) {
  const pathname = usePathname();
  const isQRScan = href === "/qr-scan";

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "flex items-center text-lg text-[#8989A1] hover:text-black transition-colors duration-150 h-fit px-3",
        pathname.startsWith(href) &&
          "font-bold text-black border-l-2 border-black",
        isQRScan && "disabled cursor-not-allowed pointer-events-none",
      )}
      aria-disabled={isQRScan}
      tabIndex={isQRScan ? -1 : undefined}
    >
      {isQRScan ? (
        <div className="flex h-fit items-center justify-start gap-1.5 text-[#8989A1] hover:cursor-pointer">
          <p className="text-lg">{title}</p>
          <p className="-mt-1 text-xs font-light">mobile only</p>
        </div>
      ) : (
        title
      )}
    </Link>
  );
}

export default function SideNav() {
  const { data } = useQueryAdminInfo();
  const isSuperAdmin = data && data.isSuperAdmin;

  return (
    <aside className="flex h-full w-52 flex-col gap-5 px-6 pb-20 pt-10">
      <AdminLogo
        styleOverride={{
          image: "w-24",
          font: "font-medium text-xs",
        }}
      />
      <GreetingHeader />
      <hr />
      <div className="py-4 flex flex-col gap-8">
        {NAV_LINK_LIST.map(({ href, title }) => (
          <NavLink key={href} href={href} title={title} />
        ))}
      </div>
      {isSuperAdmin && (
        <>
          <hr />
          <div className="py-4 flex flex-col gap-8 grow">
            {SUPER_ADMIN_NAV_LINK_LIST.map(({ href, title }) => (
              <NavLink key={href} href={href} title={title} />
            ))}
          </div>
        </>
      )}
      <hr />
      <HelperMenu />
    </aside>
  );
}
