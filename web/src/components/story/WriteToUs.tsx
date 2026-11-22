import { ContactEmail } from "@/components/layout/ContactEmail";
import { contactEmail } from "@/lib/site";

/** One quiet line at the end of every story, in place of comments. */
export function WriteToUs() {
  return (
    <aside className="write-to-us" aria-label="Write to us">
      <p className="write-to-us__title">Been here? Write to us.</p>
      <p>
        Got a correction, a better tip or a story of your own? Email{" "}
        <ContactEmail user={contactEmail.user} domain={contactEmail.domain} />. We read everything.
      </p>
    </aside>
  );
}
