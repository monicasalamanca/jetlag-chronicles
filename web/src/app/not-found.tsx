import Link from "next/link";

// Placeholder until the designed 404 (issue 12).
export default function NotFound() {
  return (
    <div className="shell">
      <div className="empty">
        <h1 className="t-h1">Page not found</h1>
        <p>
          <Link href="/">Go to the homepage</Link>
        </p>
      </div>
    </div>
  );
}
