import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const items = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'archive', label: 'Archive' },
  { id: 'divider', label: '', divider: true },
  { id: 'delete', label: 'Delete', danger: true },
];

export const Default: Story = {
  args: {
    trigger: <button>Open Menu</button>,
    items,
    onSelect: (id) => alert(`Selected: ${id}`),
  },
};

export const RightAligned: Story = {
  args: {
    trigger: <button>Right Aligned</button>,
    items,
    align: 'right',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDisabledItems: Story = {
  args: {
    trigger: <button>With Disabled</button>,
    items: [
      { id: 'enabled', label: 'Enabled item' },
      { id: 'disabled', label: 'Disabled item', disabled: true },
      { id: 'another', label: 'Another item' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    trigger: <button>With Icons</button>,
    items: [
      { id: 'edit', label: 'Edit', icon: '✏️' },
      { id: 'copy', label: 'Copy', icon: '📋' },
      { id: 'delete', label: 'Delete', icon: '🗑️', danger: true },
    ],
  },
};
