import { Link } from "react-router-dom";

/**
 * Deliberately not the standard Navbar — auth pages convention is to
 * strip distracting navigation (no Buy/Rent/Shortlet links, no "List
 * Your Property" CTA) so the person focuses on completing the form.
 * Just the brand mark and a help link.
 */
export default function AuthHeader() {
  return (
    <header className="w-full h-20 flex justify-center items-center px-margin-mobile md:px-margin-desktop bg-transparent absolute top-0 z-10">
      <div className="max-w-container-max w-full flex justify-between items-center">
        <Link
          to="/"
          className="font-display-lg text-display-lg-mobile md:text-headline-md font-bold text-primary tracking-tight"
        >
          KCEE
        </Link>
        <Link
          to="/help"
          className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
        >
          Help Center
        </Link>
      </div>
    </header>
  );
}
