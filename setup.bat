@echo off
setlocal enabledelayedexpansion

REM Darbot Deepmind MCP Server Setup Script for Windows
REM This script helps set up the development environment and build the project

echo ==================================
echo Darbot Deepmind MCP Server Setup
echo ==================================
echo.

REM Check Node.js
echo [INFO] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18 or higher.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [SUCCESS] Node.js %NODE_VERSION% found

REM Check npm
echo [INFO] Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm.
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [SUCCESS] npm %NPM_VERSION% found

echo.
echo [INFO] Starting setup process...

REM Install dependencies
echo [INFO] Installing dependencies...
call npm ci
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully

REM Run linting
echo [INFO] Running linter...
call npm run lint
if errorlevel 1 (
    echo [ERROR] Linting failed
    exit /b 1
)
echo [SUCCESS] Linting completed successfully

REM Run tests
echo [INFO] Running tests...
call npm test
if errorlevel 1 (
    echo [ERROR] Tests failed
    exit /b 1
)
echo [SUCCESS] Tests completed successfully

REM Build project
echo [INFO] Building project...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    exit /b 1
)
echo [SUCCESS] Build completed successfully

REM Test installation
echo [INFO] Testing installation...
if exist "dist\index.js" (
    echo [SUCCESS] Build artifact found
) else (
    echo [ERROR] Build artifact not found
    exit /b 1
)

echo.
echo [SUCCESS] Setup completed successfully!
echo.
echo Next steps:
echo   1. Run 'npm start' to start the server
echo   2. Or run 'npm run dev' for development mode
echo   3. See README.md for configuration instructions
echo.
echo For Docker:
echo   1. Run 'docker build -t mcp/darbot-deepmind .'
echo   2. Or run 'docker-compose up darbot-deepmind'
echo.

pause