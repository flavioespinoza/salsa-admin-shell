import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Table.module.css';

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface TableProps<T> extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  emptyMessage?: ReactNode;
  loading?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  onRowClick?: (row: T, index: number) => void;
}

function TableInner<T>(
  {
    columns,
    data,
    keyExtractor,
    emptyMessage = 'No data available',
    loading = false,
    striped = false,
    hoverable = false,
    bordered = false,
    compact = false,
    onRowClick,
    className = '',
    ...props
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
): JSX.Element {
  const classNames = [
    styles.table,
    striped && styles.striped,
    hoverable && styles.hoverable,
    bordered && styles.bordered,
    compact && styles.compact,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      <table ref={ref} className={classNames} {...props}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={styles.th}
                style={{
                  width: column.width,
                  textAlign: column.align || 'left',
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className={styles.loading}>
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={keyExtractor(row, index)}
                className={styles.tr}
                onClick={() => onRowClick?.(row, index)}
                style={{ cursor: onRowClick ? 'pointer' : undefined }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={styles.td}
                    style={{ textAlign: column.align || 'left' }}
                  >
                    {column.render
                      ? column.render(row, index)
                      : (row as Record<string, ReactNode>)[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export const Table = forwardRef(TableInner) as <T>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => JSX.Element;
