import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      removable = false,
      onRemove,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.badge,
      styles[variant],
      styles[size],
      dot && styles.dot,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {dot && <span className={styles.dotIndicator} />}
        {children}
        {removable && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={onRemove}
            aria-label="Remove"
          >
            ×
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
