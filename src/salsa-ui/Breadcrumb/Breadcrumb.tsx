import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator = '/',
      maxItems,
      className = '',
      ...props
    },
    ref
  ) => {
    let displayItems = items;

    if (maxItems && items.length > maxItems) {
      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 1));
      displayItems = [
        firstItem,
        { label: '...', href: undefined },
        ...lastItems,
      ];
    }

    return (
      <nav
        ref={ref}
        className={`${styles.breadcrumb} ${className}`}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className={styles.list}>
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;

            return (
              <li key={index} className={styles.item}>
                {item.href || item.onClick ? (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className={styles.link}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.icon && <span className={styles.icon}>{item.icon}</span>}
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={`${styles.text} ${isLast ? styles.current : ''}`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.icon && <span className={styles.icon}>{item.icon}</span>}
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
