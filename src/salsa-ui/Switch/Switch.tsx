import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from './Switch.module.css';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: SwitchSize;
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'md',
      label,
      description,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const switchId = id || `switch-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className={`${styles.wrapper} ${className}`}>
        <label className={styles.container} htmlFor={switchId}>
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            className={styles.input}
            role="switch"
            {...props}
          />
          <span className={`${styles.track} ${styles[size]}`}>
            <span className={styles.thumb} />
          </span>
          {(label || description) && (
            <span className={styles.labelContainer}>
              {label && <span className={styles.label}>{label}</span>}
              {description && <span className={styles.description}>{description}</span>}
            </span>
          )}
        </label>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
