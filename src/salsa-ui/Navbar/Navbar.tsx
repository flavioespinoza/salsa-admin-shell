import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Navbar.module.css';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  title?: ReactNode;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  sticky?: boolean;
  bordered?: boolean;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      logo,
      title,
      leftContent,
      rightContent,
      sticky = false,
      bordered = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.navbar,
      sticky && styles.sticky,
      bordered && styles.bordered,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <header ref={ref} className={classNames} {...props}>
        <div className={styles.container}>
          <div className={styles.left}>
            {logo && <div className={styles.logo}>{logo}</div>}
            {title && <div className={styles.title}>{title}</div>}
            {leftContent && <div className={styles.leftContent}>{leftContent}</div>}
          </div>
          {children && <div className={styles.center}>{children}</div>}
          {rightContent && <div className={styles.right}>{rightContent}</div>}
        </div>
      </header>
    );
  }
);

Navbar.displayName = 'Navbar';
