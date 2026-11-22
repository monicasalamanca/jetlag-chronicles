import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { contactEmail, siteName, socialLinks, toolkitLive } from "@/lib/site";
import { ContactEmail } from "./ContactEmail";

export type SiteFooterProps = {
  /** Show the Toolkit link (only once the section is live). */
  showToolkit?: boolean;
  year?: number;
};

export function SiteFooter({ showToolkit = toolkitLive, year = new Date().getFullYear() }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" aria-label={`${siteName}, home`}>
              <Logo variant="ring" />
            </Link>
            <p className="site-footer__tag">
              Travel stories with real-life lessons, from Moni &amp; Dunny, a Canadian-Colombian couple living and
              travelling abroad.
            </p>
          </div>
          <div className="site-footer__col">
            <h2>Follow</h2>
            <ul className="footer-list">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="me noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__col">
            <h2>Contact and more</h2>
            <ul className="footer-list">
              <li>
                <ContactEmail user={contactEmail.user} domain={contactEmail.domain} />
              </li>
              <li>
                <a href="/rss.xml">RSS</a>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              {showToolkit && (
                <li>
                  <Link href="/toolkit">Our Travel Toolkit</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <p className="site-footer__legal">
          © {year} Moni &amp; Dunny
        </p>
      </div>
    </footer>
  );
}
