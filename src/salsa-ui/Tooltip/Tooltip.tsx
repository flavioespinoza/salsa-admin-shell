import { forwardRef, useState, useRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  disabled?: boolean;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      position = 'top',
      delay = 200,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const showTooltip = (): void => {
      if (disabled) return;
      timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const hideTooltip = (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        {...props}
      >
        {children}
        {isVisible && (
          <div className={`${styles.tooltip} ${styles[position]}`} role="tooltip">
            {content}
            <span className={styles.arrow} />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
