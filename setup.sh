#!/bin/bash

# Darbot Deepmind MCP Server Setup Script
# This script helps set up the development environment and build the project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js version
check_node() {
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi

    NODE_VERSION=$(node -v | cut -d'v' -f2)
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1)

    if [ "$MAJOR_VERSION" -lt 18 ]; then
        print_error "Node.js version $NODE_VERSION is not supported. Please upgrade to Node.js 18 or higher."
        exit 1
    fi

    print_success "Node.js version $NODE_VERSION is supported"
}

# Check npm
check_npm() {
    if ! command_exists npm; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi

    NPM_VERSION=$(npm -v)
    print_success "npm version $NPM_VERSION found"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm ci
    print_success "Dependencies installed successfully"
}

# Run linting
run_lint() {
    print_status "Running linter..."
    npm run lint
    print_success "Linting completed successfully"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    npm test
    print_success "Tests completed successfully"
}

# Build project
build_project() {
    print_status "Building project..."
    npm run build
    print_success "Build completed successfully"
}

# Test installation
test_installation() {
    print_status "Testing installation..."
    if [ -f "dist/index.js" ]; then
        print_success "Build artifact found"
    else
        print_error "Build artifact not found"
        exit 1
    fi
}

# Main setup function
main() {
    echo "=================================="
    echo "Darbot Deepmind MCP Server Setup"
    echo "=================================="
    echo ""

    check_node
    check_npm
    
    echo ""
    print_status "Starting setup process..."
    
    install_dependencies
    run_lint
    run_tests
    build_project
    test_installation
    
    echo ""
    print_success "Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "  1. Run 'npm start' to start the server"
    echo "  2. Or run 'npm run dev' for development mode"
    echo "  3. See README.md for configuration instructions"
    echo ""
    echo "For Docker:"
    echo "  1. Run 'docker build -t mcp/darbot-deepmind .'"
    echo "  2. Or run 'docker-compose up darbot-deepmind'"
    echo ""
}

# Run main function
main "$@"