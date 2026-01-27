import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export type TabsVariant = 'line' | 'pills' | 'enclosed';

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  variant?: TabsVariant;
  defaultActiveId?: string;
  onChange?: (id: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      variant = 'line',
      defaultActiveId,
      onChange,
      className = '',
      ...props
    },
    ref
  ) => {
    const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);

    const handleTabClick = (id: string): void => {
      setActiveId(id);
      onChange?.(id);
    };

    const activeTab = items.find((item) => item.id === activeId);

    return (
      <div ref={ref} className={`${styles.tabs} ${className}`} {...props}>
        <div className={`${styles.tabList} ${styles[variant]}`} role="tablist">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`${styles.tab} ${item.id === activeId ? styles.active : ''}`}
              onClick={() => !item.disabled && handleTabClick(item.id)}
              disabled={item.disabled}
              aria-selected={item.id === activeId}
              aria-controls={`tabpanel-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          id={`tabpanel-${activeId}`}
          className={styles.tabPanel}
          role="tabpanel"
          aria-labelledby={`tab-${activeId}`}
        >
          {activeTab?.content}
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
