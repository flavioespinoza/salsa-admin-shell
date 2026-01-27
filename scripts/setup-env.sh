#!/bin/bash
set -euo pipefail

echo "=== Salsa Admin Shell - Environment Setup ==="

# Check Node.js version
REQUIRED_NODE_VERSION=18
CURRENT_NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)

if [ "$CURRENT_NODE_VERSION" -lt "$REQUIRED_NODE_VERSION" ]; then
  echo "Error: Node.js version $REQUIRED_NODE_VERSION or higher is required"
  exit 1
fi

echo "Node.js version: $(node -v)"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file from template..."
  cat > .env << EOF
# OIDC Configuration
VITE_OIDC_AUTHORITY=https://your-oidc-provider.com
VITE_OIDC_CLIENT_ID=your-client-id
VITE_OIDC_REDIRECT_URI=http://localhost:3000/callback
VITE_OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:3000

# Feature Flags
VITE_FEATURE_MFA_ENABLED=true
VITE_FEATURE_AUDIT_LOG=true

# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
EOF
  echo ".env file created successfully"
else
  echo ".env file already exists, skipping..."
fi

# Install dependencies
echo "Installing dependencies..."
npm ci

echo "=== Setup Complete ==="
