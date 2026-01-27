import { forwardRef, useEffect, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      footer,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent): void => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (): void => {
      if (closeOnOverlayClick) {
        onClose();
      }
    };

    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div
          ref={ref}
          className={`${styles.modal} ${styles[size]} ${className}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {(title || showCloseButton) && (
            <div className={styles.header}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {showCloseButton && (
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                  ×
                </button>
              )}
            </div>
          )}
          <div className={styles.content}>{children}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
