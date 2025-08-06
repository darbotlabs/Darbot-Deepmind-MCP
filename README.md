# Darbot Deepmind MCP Server

An MCP server implementation that provides advanced AI reasoning capabilities through Darbot's deepmind thinking framework. This server allows for sophisticated, step-by-step reasoning and problem-solving, making it ideal for complex tasks that require dynamic thought processes and adaptive planning.

[![npm version](https://badge.fury.io/js/%40darbotlabs%2Fdarbot-deepmind-mcp.svg)](https://badge.fury.io/js/%40darbotlabs%2Fdarbot-deepmind-mcp)
[![Node.js CI](https://github.com/darbotlabs/darbot-deepmind-mcp/workflows/CI/badge.svg)](https://github.com/darbotlabs/darbot-deepmind-mcp/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Advanced Deepmind Reasoning**: Break down complex problems into manageable thought steps
- **Dynamic Thought Revision**: Revise and refine previous thoughts as new insights emerge
- **Multi-path Reasoning**: Support for branching logic and exploring alternative solutions
- **Adaptive Planning**: Dynamically adjust the number of thoughts needed as problem complexity becomes clearer
- **Solution Hypothesis Generation**: Create and verify hypotheses throughout the reasoning process
- **Context-aware Analysis**: Filter irrelevant information while maintaining focus on key aspects
- **Beautiful Console Output**: Formatted thought display with colors and borders for enhanced readability

## Installation

### Prerequisites

- Node.js 18+ or Docker
- npm or yarn package manager (for local installation)

### Quick Installation

#### Using NPX (Recommended)

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "darbot-deepmind": {
      "command": "npx",
      "args": [
        "-y",
        "@darbotlabs/darbot-deepmind-mcp"
      ]
    }
  }
}
```

#### Using Docker

```json
{
  "mcpServers": {
    "darbot-deepmind": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "mcp/darbot-deepmind"
      ]
    }
  }
}
```

### Local Development Installation

```bash
# Clone the repository
git clone https://github.com/darbotlabs/darbot-deepmind-mcp.git
cd darbot-deepmind-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run the server
npm start
```

## Tool Reference

### darbot_deepmind

Facilitates sophisticated, step-by-step reasoning through Darbot's deepmind thinking framework for complex problem-solving and analysis.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `thought` | string | Yes | The current thinking step |
| `nextThoughtNeeded` | boolean | Yes | Whether another thought step is needed |
| `thoughtNumber` | integer | Yes | Current thought number (starting from 1) |
| `totalThoughts` | integer | Yes | Estimated total thoughts needed |
| `isRevision` | boolean | No | Whether this revises previous thinking |
| `revisesThought` | integer | No | Which thought number is being reconsidered |
| `branchFromThought` | integer | No | Branching point thought number |
| `branchId` | string | No | Branch identifier for multi-path reasoning |
| `needsMoreThoughts` | boolean | No | If more thoughts are needed beyond initial estimate |

## Usage Examples

### Basic Problem Solving

The darbot_deepmind tool excels at breaking down complex problems:

```javascript
// Example: Designing a microservices architecture
{
  "thought": "Analyzing requirements for e-commerce platform supporting 1M daily users",
  "nextThoughtNeeded": true,
  "thoughtNumber": 1,
  "totalThoughts": 8
}
```

### Thought Revision

When new insights emerge, you can revise previous thoughts:

```javascript
{
  "thought": "Revising inventory service design to include real-time updates via event streaming",
  "nextThoughtNeeded": true,
  "thoughtNumber": 5,
  "totalThoughts": 10,
  "isRevision": true,
  "revisesThought": 4
}
```

### Branching Logic

Explore alternative solutions:

```javascript
{
  "thought": "Exploring serverless architecture as alternative to containerized microservices",
  "nextThoughtNeeded": true,
  "thoughtNumber": 6,
  "totalThoughts": 12,
  "branchFromThought": 3,
  "branchId": "serverless-alternative"
}
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DISABLE_THOUGHT_LOGGING` | `false` | Set to `true` to disable detailed thought logging |
| `MCP_PORT` | `3000` | Port for MCP server (when running standalone) |
| `LOG_LEVEL` | `info` | Logging level: `debug`, `info`, `warn`, `error` |

### VS Code Integration

For VS Code users, you can install via:

[![Install with NPX in VS Code](https://img.shields.io/badge/VS_Code-NPM-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=darbot-deepmind&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40darbotlabs%2Fdarbot-deepmind-mcp%22%5D%7D)

Or manually add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "darbot-deepmind": {
      "command": "npx",
      "args": [
        "-y",
        "@darbotlabs/darbot-deepmind-mcp"
      ]
    }
  }
}
```

## Building from Source

### Docker Build

```bash
# Build the Docker image
docker build -t mcp/darbot-deepmind -f Dockerfile .

# Run the Docker container
docker run --rm -i mcp/darbot-deepmind
```

### Local Build

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build TypeScript
npm run build

# Start the server
npm start
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Server Not Starting

**Symptom**: The server fails to start or immediately exits.

**Solutions**:
- Ensure Node.js 18+ is installed: `node --version`
- Check if port 3000 is available: `netstat -an | findstr 3000` (Windows) or `lsof -i :3000` (macOS/Linux)
- Verify all dependencies are installed: `npm install`
- Check for TypeScript compilation errors: `npm run build`
- Clear npm cache: `npm cache clean --force`

#### 2. Tool Not Discovered

**Symptom**: Claude or VS Code shows "0 tools discovered".

**Solutions**:
- Verify the server is running: Check process list with `tasklist | findstr node` (Windows) or `ps aux | grep node` (macOS/Linux)
- Ensure MCP protocol version compatibility
- Check server logs for registration errors
- Restart Claude Desktop or VS Code after configuration changes
- Verify JSON syntax in configuration files

#### 3. Thought Logging Issues

**Symptom**: Too much or no thought logging in console.

**Solutions**:
- To disable logging: Set `DISABLE_THOUGHT_LOGGING=true`
- To enable debug logging: Set `LOG_LEVEL=debug`
- Check log file permissions in Docker containers
- Verify environment variables are properly set

#### 4. Docker Container Issues

**Symptom**: Docker container exits immediately or fails to respond.

**Solutions**:
- Ensure Docker daemon is running: `docker info`
- Check container logs: `docker logs <container-id>`
- Verify the image was built successfully: `docker images`
- Try running with `-it` flags for interactive mode: `docker run -it --rm mcp/darbot-deepmind`
- Check Docker memory and CPU limits

#### 5. NPX Installation Failures

**Symptom**: NPX command fails or hangs.

**Solutions**:
- Clear npm cache: `npm cache clean --force`
- Try with explicit registry: `npx --registry https://registry.npmjs.org/ -y @darbotlabs/darbot-deepmind-mcp`
- Check network proxy settings
- Use local installation method instead
- Verify npm version: `npm --version` (should be 7+)

#### 6. Memory or Performance Issues

**Symptom**: Server becomes slow or unresponsive with complex problems.

**Solutions**:
- Limit thought depth for very complex problems
- Monitor memory usage during operation: `top` or Task Manager
- Consider breaking very large problems into sub-problems
- Adjust Node.js memory limits: `node --max-old-space-size=4096 dist/index.js`
- Check for memory leaks in thought history

#### 7. Configuration Not Loading

**Symptom**: Configuration changes not taking effect.

**Solutions**:
- Verify JSON syntax in configuration files: Use online JSON validator
- Check file paths are correct (especially on Windows)
- Ensure proper escaping of backslashes in Windows paths: Use double backslashes `\\\\` or forward slashes `/`
- Restart the MCP client after configuration changes
- Check file permissions

#### 8. TypeScript Compilation Errors

**Symptom**: Build fails with TypeScript errors.

**Solutions**:
- Check TypeScript version compatibility: `npx tsc --version`
- Verify `tsconfig.json` configuration
- Clear TypeScript build cache: `rm -rf dist && npm run build`
- Check for conflicting type definitions
- Ensure all dependencies are properly installed

#### 9. Permission Issues (Linux/macOS)

**Symptom**: Permission denied errors when running scripts.

**Solutions**:
- Make scripts executable: `chmod +x dist/*.js`
- Check file ownership: `ls -la`
- Run with appropriate permissions: `sudo npm install -g`
- Use `nvm` for Node.js version management to avoid permission issues

### Debug Mode

To enable detailed debugging:

```bash
# Set environment variables
export LOG_LEVEL=debug
export DISABLE_THOUGHT_LOGGING=false

# Windows PowerShell
$env:LOG_LEVEL="debug"
$env:DISABLE_THOUGHT_LOGGING="false"

# Run with debug output
npm start
```

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/darbotlabs/darbot-deepmind-mcp/issues)
2. Enable debug logging and collect logs
3. Create a minimal reproduction case
4. File a new issue with:
   - System information (OS, Node.js version, npm version)
   - Complete error messages
   - Steps to reproduce
   - Configuration files (redacted if necessary)
   - Debug logs

## Use Cases

The Darbot Deepmind MCP server is ideal for:

- **Software Architecture Design**: Breaking down complex system requirements
- **Problem Analysis**: Systematic exploration of multi-faceted issues
- **Research Planning**: Developing comprehensive research strategies
- **Decision Making**: Evaluating options with structured thinking
- **Code Review**: Analyzing code with step-by-step reasoning
- **Learning and Education**: Breaking down complex topics into understandable steps
- **Project Planning**: Decomposing large projects into manageable tasks
- **Debugging**: Systematic approach to identifying and solving issues

## Performance Considerations

- **Memory Usage**: Each thought is stored in memory. For very long reasoning chains, consider breaking into smaller sessions
- **Response Time**: Complex formatting may add small delays. Disable logging for production if needed
- **Concurrency**: The server handles one reasoning chain at a time per instance

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/darbotlabs/darbot-deepmind-mcp.git
cd darbot-deepmind-mcp

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint:fix

# Format code
npm run format
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the [LICENSE](LICENSE) file in the project repository.

## Acknowledgments

- Built with the [Model Context Protocol](https://modelcontextprotocol.io/)
- Inspired by advanced AI reasoning techniques
- Uses [Chalk](https://github.com/chalk/chalk) for beautiful console output
- Validation powered by [Zod](https://github.com/colinhacks/zod)

---

**Made with ❤️ by Darbot Labs**