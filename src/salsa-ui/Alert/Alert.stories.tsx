import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your settings before proceeding.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
  },
};

export const Closable: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    children: 'You can close this alert by clicking the X button.',
    closable: true,
    onClose: () => alert('Alert closed!'),
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Operation completed',
  },
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    children: 'This alert has no title, only a description.',
  },
};
