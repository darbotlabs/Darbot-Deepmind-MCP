# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-22

### Added
- **Microsoft Authentication Tool**: Full integration with microsoft-authentication-cli
  - New `microsoft_auth` MCP tool for Azure AD authentication
  - Support for multiple authentication modes: interactive, device-code, and silent
  - Configurable output formats: token, json, and status
  - Timeout configuration for long-running authentication flows
  - Config alias support for simplified authentication
  - Automatic detection and helpful error messages when azureauth CLI is not installed
  - Comprehensive test suite with 25 test cases covering all scenarios
- **GitHub Copilot SDK**: Added `@github/copilot-sdk` ^0.1.25 as dependency for planned multi-model orchestration
- GitHub Pages documentation site with comprehensive guides
- VS Code workspace configuration

### Changed
- **Dependency Upgrades**: Upgraded all dependencies to latest versions
  - `@modelcontextprotocol/sdk` 0.5.0 -> 1.26.0 (fixes ReDoS and DNS rebinding vulnerabilities)
  - `zod` 3.23.8 -> 4.3.6
  - `chalk` 5.3.0 -> 5.6.2
  - `jest` 29.7.0 -> 30.2.0
  - `eslint` 9.17.0 -> 10.0.1
  - `typescript` 5.7.2 -> 5.9.3
  - `@types/jest` 29.5.14 -> 30.0.0
  - `@types/node` 22.10.2 -> 25.3.0
  - `@typescript-eslint/eslint-plugin` 8.19.0 -> 8.56.0
  - `@typescript-eslint/parser` 8.19.0 -> 8.56.0
  - `prettier` 3.4.2 -> 3.8.1
  - `rimraf` 6.0.1 -> 6.1.3
  - `ts-jest` 29.2.5 -> 29.4.6
  - `tsx` 4.19.2 -> 4.21.0
- **ESLint 10 Migration**: Migrated from `.eslintrc.json` (legacy) to `eslint.config.mjs` (flat config)
  - Added `@eslint/js`, `globals`, and `typescript-eslint` as dev dependencies
  - Removed deprecated `--ext` flag from lint scripts
- **Zod 4.x Migration**: Updated error handling from `.errors` to `.issues`
- **Node.js Minimum Version**: Raised from 18.0.0 to 20.19.0 (required by ESLint 10)
- **CI Matrix**: Updated from Node 18/20/22 to Node 20/22
- Enhanced server initialization to support multiple MCP tools
- Applied strict lint fixes (bare catch clauses, typed JSON.parse, explicit return types)

### Security
- Resolved 5 Dependabot vulnerabilities (3 high, 2 moderate)
  - Fixed ReDoS vulnerability in `@modelcontextprotocol/sdk` (CVE alert #10)
  - Fixed DNS rebinding protection bypass in `@modelcontextprotocol/sdk` (CVE alert #6)
  - Fixed command injection in `glob` CLI (CVE alert #4)
  - Fixed prototype pollution in `js-yaml` (CVE alerts #2, #5)

### Breaking Changes
- **Minimum Node.js version raised to 20.19.0** (previously 18.0.0)
- ESLint configuration format changed from `.eslintrc.json` to `eslint.config.mjs`

### Planned
- **GitHub Copilot SDK Integration**: Dual integration with `@github/copilot-sdk`
  - Outbound: Darbot Deepmind uses Copilot SDK to orchestrate multi-model parallel reasoning chains across GPT-5, Claude, and other models
  - Inbound: Copilot SDK apps and agents consume Darbot Deepmind as an MCP server for structured reasoning
- Source-level test coverage (current tests validate logic via mocks)
- Additional reasoning patterns and performance optimizations
- Integration guides for popular frameworks

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

### Technical Specifications
- **Node.js**: Requires 18.0.0 or higher
- **TypeScript**: Built with TypeScript 5.7.2
- **MCP SDK**: Compatible with Model Context Protocol SDK 0.5.0
- **Testing**: Jest 29 test framework
- **Code Quality**: ESLint 9 and Prettier for consistent code style

---

For more details about any release, please see the [GitHub releases page](https://github.com/darbotlabs/darbot-deepmind-mcp/releases).
