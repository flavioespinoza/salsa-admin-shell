import { useState } from 'react';
import { Card, Table, Button, Input, Badge, Avatar, Pagination } from '../../salsa-ui';
import styles from './Page.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15 10:30' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14 15:45' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'inactive', lastLogin: '2024-01-10 08:00' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'active', lastLogin: '2024-01-15 09:15' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'pending', lastLogin: 'Never' },
];

export function UsersPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      key: 'user',
      header: 'User',
      render: (row: User) => (
        <div className={styles.userCell}>
          <Avatar name={row.name} size="sm" />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{row.name}</span>
            <span className={styles.userEmail}>{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (row: User) => <Badge variant="default">{row.role}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: User) => (
        <Badge
          variant={
            row.status === 'active' ? 'success' : row.status === 'inactive' ? 'error' : 'warning'
          }
          dot
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
    },
    {
      key: 'actions',
      header: '',
      align: 'right' as const,
      render: () => (
        <Button variant="ghost" size="sm">
          •••
        </Button>
      ),
    },
  ];

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Users</h1>
          <p className={styles.subtitle}>Manage user accounts and permissions</p>
        </div>
        <Button>Add User</Button>
      </header>

      <Card className={styles.card}>
        <div className={styles.toolbar}>
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <Table
          columns={columns}
          data={filteredUsers}
          keyExtractor={(row) => row.id}
          hoverable
          emptyMessage="No users found"
        />

        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>
    </div>
  );
}

export default UsersPage;
