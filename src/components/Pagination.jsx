import Icon from "./Icon";

/**
 * The Stitch export hardcoded "1, 2, 3, ..., 12" directly in markup.
 * That breaks the moment there are 4 pages or 50 pages. This version
 * takes currentPage/totalPages as props and computes what to show,
 * so it's correct for any real result set once the backend exists.
 */
export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  const showEllipsis = totalPages > 4;
  const pagesToShow = showEllipsis
    ? [1, 2, 3]
    : Array.from({ length: totalPages }, (_, i) => i + 1);

  const goTo = (page) => {
    if (page >= 1 && page <= totalPages) onPageChange?.(page);
    // TODO: connect to GET /api/listings?page=N once backend exists
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-stack-lg">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-on-surface"
      >
        <Icon name="chevron_left" />
      </button>

      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => goTo(page)}
          className={
            page === currentPage
              ? "w-10 h-10 rounded-full bg-primary text-white font-bold text-label-md shadow-md"
              : "w-10 h-10 rounded-full border border-outline-variant font-medium text-label-md hover:bg-surface-container-high transition-colors"
          }
        >
          {page}
        </button>
      ))}

      {showEllipsis && (
        <>
          <span className="px-2">...</span>
          <button
            onClick={() => goTo(totalPages)}
            className="w-10 h-10 rounded-full border border-outline-variant font-medium text-label-md hover:bg-surface-container-high transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-on-surface"
      >
        <Icon name="chevron_right" />
      </button>
    </nav>
  );
}
