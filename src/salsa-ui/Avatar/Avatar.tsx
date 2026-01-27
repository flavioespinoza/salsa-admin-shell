import { forwardRef, useState, type ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  size?: AvatarSize;
  name?: string;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
  rounded?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string): string {
  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16',
    '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6',
    '#6366f1', '#8b5cf6', '#a855f7', '#ec4899',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = 'md',
      name,
      src,
      alt,
      showStatus = false,
      status = 'offline',
      rounded = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false);

    const classNames = [
      styles.avatar,
      styles[size],
      rounded && styles.rounded,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const showFallback = !src || imgError;

    return (
      <div ref={ref} className={classNames}>
        {showFallback ? (
          <div
            className={styles.fallback}
            style={{ backgroundColor: name ? getColorFromName(name) : '#94a3b8' }}
          >
            {name ? getInitials(name) : '?'}
          </div>
        ) : (
          <img
            className={styles.image}
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setImgError(true)}
            {...props}
          />
        )}
        {showStatus && (
          <span className={`${styles.status} ${styles[status]}`} />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
