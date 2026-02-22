# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-05

### Added
- Initial release of Darbot Deepmind MCP Server
- Advanced AI reasoning capabilities through structured thinking framework
- Support for step-by-step problem decomposition
- Dynamic thought revision and refinement capabilities
- Multi-path reasoning with branching logic
- Adaptive planning that adjusts scope dynamically
- Solution hypothesis generation and verification
- Context-aware analysis with irrelevant information filtering
- Beautiful console output with colored formatting
- Comprehensive input validation using Zod schema
- Environment variable configuration support
- Docker containerization support
- Complete test suite with Jest
- TypeScript support with strict type checking
- ESLint and Prettier configuration
- GitHub Actions CI/CD pipeline
- Comprehensive documentation and troubleshooting guide

### Features
- **Core Tool**: `darbot_deepmind` for sophisticated reasoning
- **Input Parameters**: 
  - Required: `thought`, `nextThoughtNeeded`, `thoughtNumber`, `totalThoughts`
  - Optional: `isRevision`, `revisesThought`, `branchFromThought`, `branchId`, `needsMoreThoughts`
- **Validation**: Comprehensive input validation and error handling
- **Logging**: Configurable thought logging with `DISABLE_THOUGHT_LOGGING` environment variable
- **Response Format**: Structured JSON responses with thought tracking
- **Branch Management**: Support for exploring alternative solution paths
- **Revision Support**: Ability to revise and refine previous thoughts

### Technical Specifications
- **Node.js**: Requires 18.0.0 or higher
- **TypeScript**: Built with TypeScript 5.9.3
- **MCP SDK**: Compatible with Model Context Protocol SDK 1.26.0
- **GitHub Copilot SDK**: `@github/copilot-sdk` 0.1.25
- **Testing**: Jest test framework with 80%+ coverage requirement
- **Code Quality**: ESLint and Prettier for consistent code style
- **Package Management**: npm with lockfile for reproducible builds

### Installation Methods
- NPX: `npx -y @darbotlabs/darbot-deepmind-mcp`
- Docker: `docker run --rm -i mcp/darbot-deepmind`
- Local development: Clone and build from source

### Documentation
- Comprehensive README with installation instructions
- Detailed troubleshooting guide covering 9 common issue categories
- Contributing guidelines and development setup
- MIT License for open source use
- Code examples and usage patterns

### Infrastructure
- GitHub Actions CI pipeline testing on Node.js 18, 20, and 22
- Docker build and test automation
- Automated npm publishing workflow (dry-run)
- Codecov integration for coverage reporting

## [Unreleased]

### Changed
- **Dependency Upgrades**: Upgraded all dependencies to latest versions
  - `@modelcontextprotocol/sdk` 0.5.0 → 1.26.0 (fixes ReDoS and DNS rebinding vulnerabilities)
  - `zod` 3.23.8 → 4.3.6
  - `chalk` 5.3.0 → 5.6.2
  - `jest` 29.7.0 → 30.2.0
  - `eslint` 9.17.0 → 10.0.1
  - `typescript` 5.7.2 → 5.9.3
  - `@types/jest` 29.5.14 → 30.0.0
  - `@types/node` 22.10.2 → 25.3.0
  - `@typescript-eslint/eslint-plugin` 8.19.0 → 8.56.0
  - `@typescript-eslint/parser` 8.19.0 → 8.56.0
  - `prettier` 3.4.2 → 3.8.1
  - `rimraf` 6.0.1 → 6.1.3
  - `ts-jest` 29.2.5 → 29.4.6
  - `tsx` 4.19.2 → 4.21.0
- Added `@github/copilot-sdk` ^0.1.25 as new dependency for GitHub Copilot integration
- Migrated ESLint configuration from `.eslintrc.json` (legacy) to `eslint.config.mjs` (flat config) for ESLint 10
- Updated lint scripts to remove deprecated `--ext` flag
- Added `@eslint/js`, `globals`, and `typescript-eslint` as dev dependencies for flat config
- Migrated Zod error handling from `.errors` to `.issues` for Zod 4.x compatibility
- Removed unnecessary async from ListTools handler
- Applied strict lint fixes (bare catch clauses, typed JSON.parse, explicit return types)

### Security
- Resolved 5 Dependabot vulnerabilities (3 high, 2 moderate)
  - Fixed ReDoS vulnerability in `@modelcontextprotocol/sdk` (CVE alert #10)
  - Fixed DNS rebinding protection bypass in `@modelcontextprotocol/sdk` (CVE alert #6)
  - Fixed command injection in `glob` CLI (CVE alert #4)
  - Fixed prototype pollution in `js-yaml` (CVE alerts #2, #5)

### Added
- **Microsoft Authentication Tool**: Full integration with microsoft-authentication-cli
  - New `microsoft_auth` MCP tool for Azure AD authentication
  - Support for multiple authentication modes: interactive, device-code, and silent
  - Configurable output formats: token, json, and status
  - Timeout configuration for long-running authentication flows
  - Config alias support for simplified authentication
  - Automatic detection and helpful error messages when azureauth CLI is not installed
  - Comprehensive test suite with 23 test cases covering all scenarios
- Documentation updates:
  - Microsoft Auth tool reference with complete parameter descriptions
  - Installation instructions for azureauth CLI (Windows and macOS)
  - Usage examples for different authentication scenarios
  - Troubleshooting section for common authentication issues
  - Environment variable documentation for Azure-related configuration
  - Updated use cases to include Azure integration scenarios
- GitHub Pages documentation site with comprehensive guides
- Configuration guide with environment variables and integration examples
- Framework documentation covering technical architecture and design patterns
- Complete API reference with detailed parameter descriptions
- Troubleshooting guide with solutions to common issues
- Professional landing page with feature highlights and quick start guides

### Changed
- Enhanced server initialization to support multiple MCP tools
- Updated acknowledgments to credit microsoft-authentication-cli

### Technical Details
- Added `child_process` exec and promisify imports for CLI execution
- Implemented `MicrosoftAuthServer` class with authentication logic
- Added comprehensive error handling for CLI execution failures
- Zod schema validation for Microsoft Auth inputs
- Proper timeout handling and process management

### Planned
- **GitHub Copilot SDK Integration**: Dual integration with `@github/copilot-sdk`
  - Outbound: Darbot Deepmind uses Copilot SDK to orchestrate multi-model parallel reasoning chains across GPT-5, Claude, and other models
  - Inbound: Copilot SDK apps and agents consume Darbot Deepmind as an MCP server for structured reasoning
- Additional reasoning patterns
- Performance optimizations
- Extended validation rules
- Source-level test coverage (current tests validate logic via mocks)
- Integration guides for popular frameworks

---

For more details about any release, please see the [GitHub releases page](https://github.com/darbotlabs/darbot-deepmind-mcp/releases).