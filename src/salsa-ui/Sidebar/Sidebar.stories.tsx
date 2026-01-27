import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '400px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const items = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'users', label: 'Users', icon: '👥', badge: '12' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'audit', label: 'Audit Log', icon: '📋' },
];

export const Default: Story = {
  args: {
    items,
    activeId: 'dashboard',
  },
};

export const WithHeader: Story = {
  args: {
    items,
    activeId: 'users',
    header: <div style={{ fontWeight: 'bold' }}>Admin Panel</div>,
  },
};

export const WithFooter: Story = {
  args: {
    items,
    activeId: 'settings',
    footer: <div style={{ fontSize: '0.75rem', color: 'gray' }}>v1.0.0</div>,
  },
};

export const Collapsed: Story = {
  args: {
    items,
    activeId: 'dashboard',
    collapsed: true,
  },
};

export const WithNestedItems: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      {
        id: 'users',
        label: 'Users',
        icon: '👥',
        children: [
          { id: 'all-users', label: 'All Users' },
          { id: 'admins', label: 'Admins' },
          { id: 'guests', label: 'Guests' },
        ],
      },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    activeId: 'all-users',
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      ...items,
      { id: 'disabled', label: 'Disabled', icon: '🚫', disabled: true },
    ],
    activeId: 'dashboard',
  },
};
