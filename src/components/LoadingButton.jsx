import Icon from "./Icon";

/**
 * A submit button that shows a spinner and swapped label while
 * `loading` is true. The Stitch login export implemented this with a
 * raw setTimeout and manual innerHTML replacement in a <script> tag —
 * here it's a controlled prop so any page can drive the loading state
 * from real async logic (or a fake delay, for now) without duplicating
 * the spinner markup.
 *
 * Built as a shared component rather than inline in LoginPage because
 * SignupPage's submit button will want this exact same treatment once
 * it's wired to a real signup request.
 */
export default function LoadingButton({ loading, loadingLabel, children, className = "", ...props }) {
  return (
    <button {...props} disabled={loading || props.disabled} className={className}>
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Icon name="progress_activity" className="animate-spin text-lg" />
          {loadingLabel}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
