import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    title: 'Admin Dashboard',
  },
};

export const WithLogo: Story = {
  args: {
    logo: <span style={{ fontSize: '1.5rem' }}>🔐</span>,
    title: 'Security Gateway',
  },
};

export const WithRightContent: Story = {
  args: {
    title: 'Admin Panel',
    rightContent: (
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button>Settings</button>
        <button>Profile</button>
      </div>
    ),
  },
};

export const WithLeftContent: Story = {
  args: {
    title: 'Dashboard',
    leftContent: (
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <a href="#">Home</a>
        <a href="#">Users</a>
        <a href="#">Settings</a>
      </nav>
    ),
  },
};

export const FullFeatured: Story = {
  args: {
    logo: <span style={{ fontSize: '1.5rem' }}>🔐</span>,
    title: 'Salsa Admin',
    leftContent: (
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <a href="#">Dashboard</a>
        <a href="#">Users</a>
      </nav>
    ),
    rightContent: (
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span>John Doe</span>
        <button>Logout</button>
      </div>
    ),
  },
};

export const WithSearch: Story = {
  args: {
    logo: <span style={{ fontSize: '1.5rem' }}>🔐</span>,
    title: 'Admin',
    children: <input type="search" placeholder="Search..." style={{ width: '300px', padding: '0.5rem' }} />,
    rightContent: <button>Profile</button>,
  },
};

export const NotBordered: Story = {
  args: {
    title: 'No Border',
    bordered: false,
  },
};

export const Sticky: Story = {
  args: {
    title: 'Sticky Navbar',
    sticky: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh' }}>
        <Story />
        <p style={{ padding: '1rem' }}>Scroll down to see sticky behavior</p>
      </div>
    ),
  ],
};
