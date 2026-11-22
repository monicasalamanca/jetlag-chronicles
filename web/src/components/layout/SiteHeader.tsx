import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { siteName } from "@/lib/site";
import { MainNav } from "./MainNav";

/** Site header: logo home link plus the main menu. `nav` is replaceable so tests can render it without a router. */
export function SiteHeader({ nav = <MainNav /> }: { nav?: ReactNode }) {
  return (
    <header className="site-header">
      <div className="shell">
        <div className="site-header__bar">
          <Link className="site-logo" href="/" aria-label={`${siteName}, home`}>
            <Logo />
          </Link>
          {nav}
        </div>
      </div>
    </header>
  );
}
