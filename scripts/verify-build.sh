#!/bin/bash
set -euo pipefail

echo "=== Salsa Admin Shell - Build Verification ==="

# Run linting
echo "Running ESLint..."
npm run lint

# Run type checking
echo "Running TypeScript type check..."
npx tsc --noEmit

# Run tests
echo "Running test suite..."
npm run test -- --coverage --passWithNoTests

# Run build
echo "Building production bundle..."
npm run build

# Verify build output
if [ -d "dist" ]; then
  echo "Build output verified in dist/"
  du -sh dist/
else
  echo "Error: Build output not found"
  exit 1
fi

echo "=== Build Verification Complete ==="
