import { forwardRef, useState, useRef, useEffect, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Dropdown.module.css';

export interface DropdownItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  onSelect?: (id: string) => void;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      items,
      align = 'left',
      onSelect,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent): void => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleItemClick = (item: DropdownItem): void => {
      if (item.disabled || item.divider) return;
      onSelect?.(item.id);
      setIsOpen(false);
    };

    return (
      <div ref={ref} className={`${styles.dropdown} ${className}`} {...props}>
        <div ref={dropdownRef}>
          <div
            className={styles.trigger}
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            {trigger}
          </div>
          {isOpen && (
            <div className={`${styles.menu} ${styles[align]}`} role="menu">
              {items.map((item, index) =>
                item.divider ? (
                  <div key={`divider-${index}`} className={styles.divider} />
                ) : (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.item} ${item.danger ? styles.danger : ''}`}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    role="menuitem"
                  >
                    {item.icon && <span className={styles.icon}>{item.icon}</span>}
                    {item.label}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
