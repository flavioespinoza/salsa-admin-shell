import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const items = [
  {
    id: '1',
    title: 'What is OIDC?',
    content: 'OpenID Connect (OIDC) is an authentication protocol built on top of OAuth 2.0.',
  },
  {
    id: '2',
    title: 'How does SSO work?',
    content: 'Single Sign-On allows users to authenticate once and access multiple applications.',
  },
  {
    id: '3',
    title: 'What are scopes?',
    content: 'Scopes define the access privileges requested during authentication.',
  },
];

export const Default: Story = {
  args: {
    items,
  },
};

export const DefaultExpanded: Story = {
  args: {
    items,
    defaultExpanded: ['1'],
  },
};

export const AllowMultiple: Story = {
  args: {
    items,
    allowMultiple: true,
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      ...items,
      {
        id: '4',
        title: 'Disabled Item',
        content: 'This content cannot be shown.',
        disabled: true,
      },
    ],
  },
};
