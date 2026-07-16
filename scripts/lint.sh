#!/bin/bash

# Dart/Flutter Linting Script
# This script runs the Dart analyzer and formatter to check code quality
# and enforce consistent formatting across the project.

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Running Dart analyzer...${NC}"

# Run the analyzer
if flutter analyze; then
    echo -e "${GREEN}✓ Analyzer passed${NC}"
else
    echo -e "${RED}✗ Analyzer found issues${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Checking code formatting...${NC}"

# Check formatting without modifying files
if dart format --set-exit-if-changed --line-length=80 lib test; then
    echo -e "${GREEN}✓ Code formatting is correct${NC}"
else
    echo -e "${RED}✗ Code formatting issues found${NC}"
    echo -e "${YELLOW}Run 'dart format --line-length=80 lib test' to fix formatting${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}All linting checks passed!${NC}"
