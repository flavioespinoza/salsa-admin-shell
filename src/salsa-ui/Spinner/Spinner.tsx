import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: string;
  label?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color,
      label = 'Loading',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const classNames = [styles.spinner, styles[size], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        role="status"
        aria-label={label}
        style={{ ...style, ...(color && { borderTopColor: color }) }}
        {...props}
      >
        <span className={styles.srOnly}>{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
