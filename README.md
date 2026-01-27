# Salsa Admin Shell

A secure, enterprise-ready Security Gateway Dashboard for OIDC (OpenID Connect) management.

## Overview

Salsa Admin Shell is a standalone identity management portal designed for enterprise-scale deployments. It provides a unified interface for managing authentication providers, user sessions, and security policies.

## Features

- **Multi-Provider OIDC Support** - 20 pre-built adapters for major identity providers
- **Vendored Design System** - Customizable Salsa UI component library
- **Internationalization** - Built-in support for EN, ES, FR, DE
- **Audit Logging** - Comprehensive activity tracking
- **Role-Based Access Control** - Granular permission management
- **Theme Support** - Light, dark, and system themes

## Architecture

```
salsa-admin-shell/
├── src/
│   ├── salsa-ui/          # Vendored design system (20 components)
│   ├── providers/         # OIDC provider adapters
│   ├── context/           # React context providers
│   ├── views/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── locales/           # i18n translations
├── tests/
│   └── fixtures/          # Test mock data
└── scripts/               # Build and setup scripts
```

## Supported Identity Providers

| Provider | Status |
|----------|--------|
| Google | ✅ |
| GitHub | ✅ |
| Microsoft Azure AD | ✅ |
| Okta | ✅ |
| Auth0 | ✅ |
| GitLab | ✅ |
| Bitbucket | ✅ |
| Apple | ✅ |
| Facebook | ✅ |
| Twitter/X | ✅ |
| Discord | ✅ |
| Slack | ✅ |
| Salesforce | ✅ |
| HubSpot | ✅ |
| Notion | ✅ |
| Zoom | ✅ |
| Spotify | ✅ |
| Twitch | ✅ |
| Reddit | ✅ |
| Linear | ✅ |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/flavioespinoza/salsa-admin-shell.git
cd salsa-admin-shell

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your OIDC configuration

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_OIDC_AUTHORITY=https://your-oidc-provider.com
VITE_OIDC_CLIENT_ID=your-client-id
VITE_OIDC_REDIRECT_URI=http://localhost:3000/callback
VITE_FEATURE_MFA_ENABLED=true
VITE_FEATURE_AUDIT_LOG=true
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run test` | Run test suite |
| `npm run lint` | Run ESLint |
| `npm run storybook` | Launch Storybook |

## Component Library

The vendored Salsa UI design system includes:

- **Layout**: Card, Modal, Sidebar, Navbar
- **Forms**: Button, Input, Switch, Dropdown
- **Data Display**: Table, Badge, Avatar, Tooltip
- **Feedback**: Alert, Toast, Spinner, Skeleton
- **Navigation**: Tabs, Accordion, Breadcrumb, Pagination

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application
open http://localhost:3000
```

## Project Structure

- **201 files** organized in a monorepo-style architecture
- Separation of concerns between UI, business logic, and infrastructure
- Comprehensive test fixtures for offline development

## License

MIT
