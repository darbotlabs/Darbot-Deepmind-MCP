# GitHub Copilot Instructions for Darbot Deepmind MCP

This document provides guidance to GitHub Copilot when working on the Darbot Deepmind MCP Server project.

## Project Overview

Darbot Deepmind MCP Server is a Model Context Protocol (MCP) server that provides advanced AI reasoning capabilities through a structured thinking framework. It enables sophisticated, step-by-step reasoning and problem-solving with dynamic thought processes and adaptive planning.

## Technology Stack

- **Language**: TypeScript 5.7.2+ with strict type checking
- **Runtime**: Node.js 18.0.0 or higher
- **Key Dependencies**:
  - `@modelcontextprotocol/sdk` - MCP protocol implementation
  - `zod` - Schema validation
  - `chalk` - Console output formatting
- **Testing**: Jest with 80%+ coverage requirement
- **Code Quality**: ESLint and Prettier

## Coding Standards

### TypeScript Guidelines

- Use strict TypeScript settings - avoid `any` types whenever possible
- Provide explicit type annotations for function parameters and return values
- Leverage union types and generics appropriately
- Use `z.infer` for deriving types from Zod schemas
- Prefer interfaces for object shapes, types for unions/intersections

### Code Style

- Use 2 spaces for indentation (no tabs)
- Use meaningful, descriptive variable and function names
- Add JSDoc comments for all public methods and exported functions
- Follow the existing code structure and patterns
- Keep functions focused and single-purpose

### Error Handling

- Use proper error handling with try/catch blocks
- Throw `McpError` for MCP-specific errors with appropriate error codes
- Provide meaningful, actionable error messages
- Validate inputs using Zod schemas before processing

## MCP Server Patterns

### Tool Implementation

When implementing or modifying MCP tools:
- Define tools using the MCP SDK `Tool` type
- Use Zod schemas for input validation
- Return structured responses with consistent formats
- Handle both successful and error cases explicitly

### Request Handling

- Use `CallToolRequestSchema` for tool invocations
- Validate all tool arguments before processing
- Provide detailed error messages for validation failures
- Use appropriate MCP error codes (InvalidParams, InternalError, etc.)

## Testing Requirements

- Write unit tests for all new functionality
- Aim for at least 80% code coverage
- Use descriptive test names that explain what is being tested
- Group related tests using `describe` blocks
- Test both success and error cases
- Mock external dependencies appropriately

### Test Structure Example

```typescript
describe('Feature Name', () => {
  describe('Specific Behavior', () => {
    it('should do something specific', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Development Workflow

### Before Committing

1. Run tests: `npm test`
2. Run linting: `npm run lint:fix`
3. Format code: `npm run format`
4. Build project: `npm run build`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or tooling changes

**Examples:**
- `feat: add support for thought branching validation`
- `fix: prevent revision of future thoughts`
- `docs: update troubleshooting section`
- `test: add comprehensive validation tests`

## Architecture Patterns

### Darbot Deepmind Tool

The core `darbot_deepmind` tool facilitates step-by-step reasoning:
- Tracks thought history and branching paths
- Supports thought revision and multi-path reasoning
- Validates thought sequences and dependencies
- Provides formatted console output for thought visualization

### Key Concepts

- **Thought Number**: Sequential identifier for each reasoning step
- **Revision**: Ability to reconsider and update previous thoughts
- **Branching**: Exploring alternative solution paths from a specific thought
- **Adaptive Planning**: Dynamically adjusting total thought estimates

## Documentation Updates

When making changes:
- Update README.md for user-facing features
- Update CHANGELOG.md following Keep a Changelog format
- Add JSDoc comments for new public APIs
- Include usage examples for new functionality
- Update troubleshooting section if introducing new error conditions

## Common Patterns in This Codebase

### Input Validation

```typescript
const Schema = z.object({
  field: z.string().min(1).describe("Description"),
  optionalField: z.number().optional().describe("Description"),
});

type Input = z.infer<typeof Schema>;
```

### Formatted Console Output

Use chalk for colored output and box-drawing characters for structure:
```typescript
const formatted = `
┌───────┐
│ ${chalk.blue('Text')} │
└───────┘`;
```

### Environment Configuration

Check environment variables in constructor:
```typescript
this.setting = process.env.SETTING_NAME?.toLowerCase() === "true";
```

## File Organization

- `src/index.ts` - Main server implementation and tool logic
- `__tests__/` - Jest test files (named `*.test.ts`)
- `README.md` - User documentation
- `CONTRIBUTING.md` - Contributor guidelines
- `CHANGELOG.md` - Version history

## Important Constraints

- Maintain backward compatibility for the `darbot_deepmind` tool API
- Keep the MCP server stateless where possible (thought history is exception)
- Ensure all console output respects `DISABLE_THOUGHT_LOGGING` environment variable
- Validate all inputs before processing to prevent invalid states
- Preserve existing error handling patterns

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [Zod Documentation](https://zod.dev)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
