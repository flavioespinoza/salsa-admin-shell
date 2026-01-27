import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Security' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: '🏠' },
      { label: 'Users', href: '/users', icon: '👥' },
      { label: 'John Doe' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile' },
    ],
    separator: '>',
  },
};

export const Truncated: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Product', href: '/category/sub/product' },
      { label: 'Details' },
    ],
    maxItems: 3,
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard' }],
  },
};

export const WithOnClick: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => alert('Home clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
      { label: 'Current Page' },
    ],
  },
};
