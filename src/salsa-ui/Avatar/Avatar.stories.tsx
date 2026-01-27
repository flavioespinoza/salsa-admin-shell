import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    name: 'John Doe',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'John Doe',
  },
};

export const SingleInitial: Story = {
  args: {
    name: 'Alice',
  },
};

export const WithStatus: Story = {
  args: {
    name: 'Jane Smith',
    showStatus: true,
    status: 'online',
  },
};

export const Offline: Story = {
  args: {
    name: 'Bob Wilson',
    showStatus: true,
    status: 'offline',
  },
};

export const Away: Story = {
  args: {
    name: 'Carol Davis',
    showStatus: true,
    status: 'away',
  },
};

export const Busy: Story = {
  args: {
    name: 'Dave Brown',
    showStatus: true,
    status: 'busy',
  },
};

export const ExtraSmall: Story = {
  args: {
    name: 'XS',
    size: 'xs',
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'XL User',
    size: 'xl',
  },
};

export const Square: Story = {
  args: {
    name: 'Square Avatar',
    rounded: false,
  },
};
