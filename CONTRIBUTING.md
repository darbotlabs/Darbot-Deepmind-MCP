# Contributing to Darbot Deepmind MCP Server

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/darbot-deepmind-mcp.git
cd darbot-deepmind-mcp

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Format code
npm run format
```

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issues](https://github.com/darbotlabs/darbot-deepmind-mcp/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/darbotlabs/darbot-deepmind-mcp/issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
  - Include configuration files (redacted if necessary)
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

**Example:**

```markdown
## Bug: Server fails to start with custom configuration

### Environment
- OS: Windows 11
- Node.js: v18.17.0
- npm: 9.6.7

### Steps to Reproduce
1. Create a custom config file with...
2. Run `npm start`
3. See error

### Expected Behavior
Server should start successfully

### Actual Behavior
Server exits with error: [include error message]

### Additional Context
This only happens when...
```

## Use a Consistent Coding Style

* Use TypeScript for all new code
* Follow the existing code style (enforced by ESLint and Prettier)
* 2 spaces for indentation rather than tabs
* Use meaningful variable and function names
* Add JSDoc comments for public methods
* Write tests for new functionality

## Code Quality Guidelines

### TypeScript
- Use strict TypeScript settings
- Avoid `any` types when possible
- Use proper type annotations
- Leverage union types and generics appropriately

### Testing
- Write unit tests for all new functionality
- Aim for at least 80% code coverage
- Use descriptive test names
- Group related tests using `describe` blocks

### Error Handling
- Use proper error handling with try/catch blocks
- Provide meaningful error messages
- Use appropriate HTTP status codes for API endpoints

### Documentation
- Update README.md for new features
- Add JSDoc comments for public APIs
- Include usage examples
- Update troubleshooting section if needed

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples
```
feat: add support for thought branching validation
fix: prevent revision of future thoughts
docs: update troubleshooting section
test: add comprehensive validation tests
```

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Add tests for your changes
4. Run the test suite: `npm test`
5. Run linting: `npm run lint:fix`
6. Format your code: `npm run format`
7. Commit your changes: `git commit -m 'feat: add amazing feature'`
8. Push to your branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.
4. Your Pull Request will be merged once you have the sign-off of at least one maintainer.

## Code Review Guidelines

When reviewing code, consider:

- **Functionality**: Does the code work as intended?
- **Readability**: Is the code easy to understand?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security concerns?
- **Testing**: Is the code adequately tested?
- **Documentation**: Is the code properly documented?

## Community

- Join our discussions in GitHub Issues
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- Be respectful and constructive in all interactions

## Recognition

Contributors will be recognized in our README.md file and release notes.

## Getting Help

If you need help with development:

1. Check existing issues and discussions
2. Read the documentation thoroughly
3. Ask questions in GitHub Issues with the `question` label
4. Provide context and specific details about your problem

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute! 🙏