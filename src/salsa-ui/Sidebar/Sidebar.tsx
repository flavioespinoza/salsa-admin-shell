import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Sidebar.module.css';

export interface SidebarItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: ReactNode;
  children?: SidebarItem[];
  disabled?: boolean;
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  items: SidebarItem[];
  activeId?: string;
  collapsed?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  onItemClick?: (item: SidebarItem) => void;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      activeId,
      collapsed = false,
      header,
      footer,
      onItemClick,
      className = '',
      ...props
    },
    ref
  ) => {
    const renderItem = (item: SidebarItem, depth = 0): JSX.Element => {
      const isActive = item.id === activeId;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <li key={item.id} className={styles.item}>
          <a
            href={item.href}
            className={`${styles.link} ${isActive ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`}
            style={{ paddingLeft: `${1 + depth * 0.75}rem` }}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
                return;
              }
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
              onItemClick?.(item);
            }}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={item.disabled}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            {!collapsed && (
              <>
                <span className={styles.label}>{item.label}</span>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </>
            )}
          </a>
          {hasChildren && !collapsed && (
            <ul className={styles.submenu}>
              {item.children!.map((child) => renderItem(child, depth + 1))}
            </ul>
          )}
        </li>
      );
    };

    return (
      <aside
        ref={ref}
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${className}`}
        {...props}
      >
        {header && <div className={styles.header}>{header}</div>}
        <nav className={styles.nav}>
          <ul className={styles.menu}>{items.map((item) => renderItem(item))}</ul>
        </nav>
        {footer && <div className={styles.footer}>{footer}</div>}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';
