import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate = (args: React.ComponentProps<typeof Modal>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Title',
    children: 'This is the modal content. You can put anything here.',
  },
};

export const WithFooter: Story = {
  render: ModalTemplate,
  args: {
    title: 'Confirm Action',
    children: 'Are you sure you want to proceed with this action?',
    footer: (
      <>
        <button>Cancel</button>
        <button>Confirm</button>
      </>
    ),
  },
};

export const Small: Story = {
  render: ModalTemplate,
  args: {
    title: 'Small Modal',
    size: 'sm',
    children: 'This is a small modal.',
  },
};

export const Large: Story = {
  render: ModalTemplate,
  args: {
    title: 'Large Modal',
    size: 'lg',
    children: 'This is a large modal with more space for content.',
  },
};

export const NoCloseButton: Story = {
  render: ModalTemplate,
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: 'This modal has no close button in the header.',
  },
};

export const NoOverlayClose: Story = {
  render: ModalTemplate,
  args: {
    title: 'Click Overlay Disabled',
    closeOnOverlayClick: false,
    children: 'Clicking the overlay will not close this modal.',
  },
};
