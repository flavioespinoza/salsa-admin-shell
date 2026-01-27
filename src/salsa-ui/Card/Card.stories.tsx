import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This is an elevated card with a subtle shadow.',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined card with a border.',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'This is a filled card with a background color.',
  },
};

export const WithHeader: Story = {
  args: {
    header: 'Card Header',
    children: 'Card content goes here.',
  },
};

export const WithFooter: Story = {
  args: {
    children: 'Card content goes here.',
    footer: 'Card Footer',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Card Title',
    children: 'This card has both a header and a footer section.',
    footer: 'Footer actions',
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: 'Hover over this card to see the effect.',
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: 'This card has no padding.',
  },
};
