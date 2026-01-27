import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationTemplate = (args: React.ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.currentPage);
  return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
};

export const Default: Story = {
  render: PaginationTemplate,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const ManyPages: Story = {
  render: PaginationTemplate,
  args: {
    currentPage: 5,
    totalPages: 20,
  },
};

export const FewPages: Story = {
  render: PaginationTemplate,
  args: {
    currentPage: 2,
    totalPages: 5,
  },
};

export const FirstPage: Story = {
  render: PaginationTemplate,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  render: PaginationTemplate,
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const WithoutFirstLast: Story = {
  render: PaginationTemplate,
  args: {
    currentPage: 5,
    totalPages: 10,
    showFirstLast: false,
  },
};

export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    disabled: true,
    onPageChange: () => {},
  },
};
