import { useAuth } from '../../context/AuthContext';
import { useFeatureFlagContext } from '../../context/FeatureFlagContext';
import { Card, Badge, Spinner } from '../../salsa-ui';
import styles from './Page.module.css';

interface StatCard {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

const stats: StatCard[] = [
  { label: 'Total Users', value: '12,543', change: 12, trend: 'up' },
  { label: 'Active Sessions', value: '1,234', change: -3, trend: 'down' },
  { label: 'Auth Providers', value: 8, trend: 'neutral' },
  { label: 'Failed Logins (24h)', value: 23, change: -15, trend: 'up' },
];

export function DashboardPage(): JSX.Element {
  const { user, isLoading } = useAuth();
  const { isEnabled } = useFeatureFlagContext();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>
          Welcome back, {user?.name || 'Admin'}
        </p>
      </header>

      <section className={styles.statsGrid}>
        {stats.map((stat) => (
          <Card key={stat.label} className={styles.statCard}>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statValue}>{stat.value}</div>
            {stat.change !== undefined && (
              <Badge
                variant={stat.trend === 'up' ? 'success' : stat.trend === 'down' ? 'error' : 'default'}
                size="sm"
              >
                {stat.change > 0 ? '+' : ''}{stat.change}%
              </Badge>
            )}
          </Card>
        ))}
      </section>

      {isEnabled('auditLog') && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <Card>
            <p className={styles.placeholder}>Activity log will be displayed here.</p>
          </Card>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <Card hoverable className={styles.actionCard}>
            <span className={styles.actionIcon}>👥</span>
            <span className={styles.actionLabel}>Manage Users</span>
          </Card>
          <Card hoverable className={styles.actionCard}>
            <span className={styles.actionIcon}>🔐</span>
            <span className={styles.actionLabel}>Security Settings</span>
          </Card>
          <Card hoverable className={styles.actionCard}>
            <span className={styles.actionIcon}>📋</span>
            <span className={styles.actionLabel}>View Audit Log</span>
          </Card>
          <Card hoverable className={styles.actionCard}>
            <span className={styles.actionIcon}>⚙️</span>
            <span className={styles.actionLabel}>Configure Providers</span>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
