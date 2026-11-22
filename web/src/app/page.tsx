import { siteName } from "@/lib/site";

// Placeholder until the homepage (issue 08).
export default function Home() {
  return (
    <div className="shell section-intro">
      <h1 className="t-h1">{siteName}</h1>
    </div>
  );
}
