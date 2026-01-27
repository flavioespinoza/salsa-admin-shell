import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    content: 'Tooltip content',
    position: 'top',
    children: <button>Hover me</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip content',
    position: 'bottom',
    children: <button>Hover me</button>,
  },
};

export const Left: Story = {
  args: {
    content: 'Tooltip content',
    position: 'left',
    children: <button>Hover me</button>,
  },
};

export const Right: Story = {
  args: {
    content: 'Tooltip content',
    position: 'right',
    children: <button>Hover me</button>,
  },
};

export const WithDelay: Story = {
  args: {
    content: 'Appears after 500ms',
    delay: 500,
    children: <button>Hover me (with delay)</button>,
  },
};

export const Disabled: Story = {
  args: {
    content: 'This will not show',
    disabled: true,
    children: <button>Disabled tooltip</button>,
  },
};
