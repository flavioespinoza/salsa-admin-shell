import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      allowMultiple = false,
      defaultExpanded = [],
      className = '',
      ...props
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

    const toggleItem = (id: string): void => {
      if (allowMultiple) {
        setExpandedItems((prev) =>
          prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
      } else {
        setExpandedItems((prev) => (prev.includes(id) ? [] : [id]));
      }
    };

    return (
      <div ref={ref} className={`${styles.accordion} ${className}`} {...props}>
        {items.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          return (
            <div
              key={item.id}
              className={`${styles.item} ${isExpanded ? styles.expanded : ''}`}
            >
              <button
                type="button"
                className={styles.trigger}
                onClick={() => !item.disabled && toggleItem(item.id)}
                disabled={item.disabled}
                aria-expanded={isExpanded}
                aria-controls={`accordion-content-${item.id}`}
              >
                <span className={styles.title}>{item.title}</span>
                <span className={styles.icon}>{isExpanded ? '−' : '+'}</span>
              </button>
              <div
                id={`accordion-content-${item.id}`}
                className={styles.content}
                role="region"
                aria-hidden={!isExpanded}
              >
                <div className={styles.contentInner}>{item.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
