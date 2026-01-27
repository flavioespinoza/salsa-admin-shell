import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pills', 'enclosed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { id: 'general', label: 'General', content: 'General settings content' },
  { id: 'security', label: 'Security', content: 'Security settings content' },
  { id: 'notifications', label: 'Notifications', content: 'Notification preferences' },
];

export const Line: Story = {
  args: {
    items,
    variant: 'line',
  },
};

export const Pills: Story = {
  args: {
    items,
    variant: 'pills',
  },
};

export const Enclosed: Story = {
  args: {
    items,
    variant: 'enclosed',
  },
};

export const WithDefaultActive: Story = {
  args: {
    items,
    defaultActiveId: 'security',
  },
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      ...items,
      { id: 'advanced', label: 'Advanced', content: 'Advanced settings', disabled: true },
    ],
  },
};
