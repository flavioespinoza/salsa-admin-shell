import { forwardRef, useEffect, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Toast.module.css';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  duration?: number;
  onClose?: () => void;
  closable?: boolean;
}

const defaultIcons: Record<ToastVariant, string> = {
  default: '',
  success: '✓',
  warning: '⚠',
  error: '✕',
  info: 'ℹ',
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'default',
      title,
      description,
      icon,
      action,
      duration = 5000,
      onClose,
      closable = true,
      className = '',
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (duration && onClose) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    const classNames = [styles.toast, styles[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} role="alert" {...props}>
        {(icon || defaultIcons[variant]) && (
          <span className={styles.icon}>{icon || defaultIcons[variant]}</span>
        )}
        <div className={styles.content}>
          {title && <div className={styles.title}>{title}</div>}
          {description && <div className={styles.description}>{description}</div>}
        </div>
        {action && <div className={styles.action}>{action}</div>}
        {closable && onClose && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
