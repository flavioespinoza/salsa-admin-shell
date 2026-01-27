import { useState } from 'react';
import { Card, Table, Badge, Input, Button, Pagination } from '../../salsa-ui';
import styles from './Page.module.css';

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'failure' | 'warning';
  ipAddress: string;
}

const mockAuditLog: AuditEntry[] = [
  { id: '1', timestamp: '2024-01-15 10:30:45', user: 'john@example.com', action: 'Login', resource: 'Authentication', status: 'success', ipAddress: '192.168.1.100' },
  { id: '2', timestamp: '2024-01-15 10:28:12', user: 'jane@example.com', action: 'Update Settings', resource: 'Settings', status: 'success', ipAddress: '192.168.1.101' },
  { id: '3', timestamp: '2024-01-15 10:25:00', user: 'unknown', action: 'Login Attempt', resource: 'Authentication', status: 'failure', ipAddress: '10.0.0.45' },
  { id: '4', timestamp: '2024-01-15 10:20:33', user: 'bob@example.com', action: 'Delete User', resource: 'Users', status: 'success', ipAddress: '192.168.1.102' },
  { id: '5', timestamp: '2024-01-15 10:15:22', user: 'alice@example.com', action: 'MFA Disabled', resource: 'Security', status: 'warning', ipAddress: '192.168.1.103' },
];

export function AuditLogPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (row: AuditEntry) => (
        <span className={styles.timestamp}>{row.timestamp}</span>
      ),
    },
    {
      key: 'user',
      header: 'User',
    },
    {
      key: 'action',
      header: 'Action',
      render: (row: AuditEntry) => (
        <span className={styles.action}>{row.action}</span>
      ),
    },
    {
      key: 'resource',
      header: 'Resource',
      render: (row: AuditEntry) => (
        <Badge variant="default" size="sm">{row.resource}</Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: AuditEntry) => (
        <Badge
          variant={
            row.status === 'success' ? 'success' : row.status === 'failure' ? 'error' : 'warning'
          }
          size="sm"
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      render: (row: AuditEntry) => (
        <code className={styles.ip}>{row.ipAddress}</code>
      ),
    },
  ];

  const filteredLog = mockAuditLog.filter(
    (entry) =>
      entry.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.resource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Audit Log</h1>
          <p className={styles.subtitle}>Track all system activity and changes</p>
        </div>
        <Button variant="outline">Export</Button>
      </header>

      <Card className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.filters}>
            <Button variant="ghost" size="sm">All Status</Button>
            <Button variant="ghost" size="sm">All Actions</Button>
            <Button variant="ghost" size="sm">Date Range</Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredLog}
          keyExtractor={(row) => row.id}
          hoverable
          compact
          emptyMessage="No audit entries found"
        />

        <div className={styles.pagination}>
          <span className={styles.showing}>
            Showing {filteredLog.length} of {mockAuditLog.length} entries
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>
    </div>
  );
}

export default AuditLogPage;
