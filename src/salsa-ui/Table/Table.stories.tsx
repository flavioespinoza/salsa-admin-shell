import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const meta: Meta<typeof Table<User>> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
];

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
];

export const Default: Story = {
  args: {
    columns,
    data,
    keyExtractor: (row) => row.id,
  },
};

export const Striped: Story = {
  args: {
    columns,
    data,
    keyExtractor: (row) => row.id,
    striped: true,
  },
};

export const Hoverable: Story = {
  args: {
    columns,
    data,
    keyExtractor: (row) => row.id,
    hoverable: true,
  },
};

export const Bordered: Story = {
  args: {
    columns,
    data,
    keyExtractor: (row) => row.id,
    bordered: true,
  },
};

export const Compact: Story = {
  args: {
    columns,
    data,
    keyExtractor: (row) => row.id,
    compact: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    keyExtractor: (row) => row.id,
    emptyMessage: 'No users found',
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    keyExtractor: (row) => row.id,
    loading: true,
  },
};

export const Clickable: Story = {
  args: {
    columns,
    data,
    keyExtractor: (row) => row.id,
    hoverable: true,
    onRowClick: (row) => alert(`Clicked: ${row.name}`),
  },
};
