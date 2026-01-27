import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Pagination.module.css';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  disabled?: boolean;
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'ellipsis')[] {
  const totalNumbers = siblingCount * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const pages: (number | 'ellipsis')[] = [];

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
    pages.push(...leftRange, 'ellipsis', totalPages);
  } else if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
    );
    pages.push(1, 'ellipsis', ...rightRange);
  } else {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    pages.push(1, 'ellipsis', ...middleRange, 'ellipsis', totalPages);
  }

  return pages;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const pages = getPageNumbers(currentPage, totalPages, siblingCount);

    return (
      <nav
        ref={ref}
        className={`${styles.pagination} ${className}`}
        aria-label="Pagination"
        {...props}
      >
        {showFirstLast && (
          <button
            type="button"
            className={styles.button}
            onClick={() => onPageChange(1)}
            disabled={disabled || currentPage === 1}
            aria-label="First page"
          >
            ««
          </button>
        )}
        <button
          type="button"
          className={styles.button}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="Previous page"
        >
          «
        </button>
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={`${styles.button} ${page === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(page)}
              disabled={disabled}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
        <button
          type="button"
          className={styles.button}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Next page"
        >
          »
        </button>
        {showFirstLast && (
          <button
            type="button"
            className={styles.button}
            onClick={() => onPageChange(totalPages)}
            disabled={disabled || currentPage === totalPages}
            aria-label="Last page"
          >
            »»
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
