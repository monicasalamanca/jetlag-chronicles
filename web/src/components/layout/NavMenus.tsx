import Link from "next/link";
import { Icon } from "@/components/brand/Icon";
import { navItems } from "@/lib/site";
import { navCurrent } from "./nav";

function NavList({ currentPath }: { currentPath: string }) {
  return (
    <ul>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} aria-current={navCurrent(item.href, currentPath)}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Desktop links and the phone menu. Only one is displayed at a time (CSS), so both can be labelled "Main".
 * The phone menu is a native <details>: it works without JavaScript. Keying it on the path closes it after
 * a client-side navigation.
 */
export function NavMenus({ currentPath }: { currentPath: string }) {
  return (
    <>
      <nav className="nav" aria-label="Main">
        <NavList currentPath={currentPath} />
      </nav>
      <details className="menu" key={currentPath}>
        <summary>
          <span>Menu</span>
          <Icon name="menu" className="icon i-open" />
          <Icon name="close" className="icon i-close" />
        </summary>
        <nav className="menu__panel" aria-label="Main">
          <NavList currentPath={currentPath} />
        </nav>
      </details>
    </>
  );
}
