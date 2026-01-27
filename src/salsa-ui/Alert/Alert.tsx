import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: ReactNode;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const defaultIcons: Record<AlertVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      icon,
      closable = false,
      onClose,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [styles.alert, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} role="alert" {...props}>
        <span className={styles.icon}>{icon || defaultIcons[variant]}</span>
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          {children && <div className={styles.description}>{children}</div>}
        </div>
        {closable && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Dismiss"
          >
            ×
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
