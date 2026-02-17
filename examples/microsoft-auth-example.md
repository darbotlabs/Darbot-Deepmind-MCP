# Microsoft Authentication Examples

This document provides practical examples of using the `microsoft_auth` tool for Azure AD authentication.

## Prerequisites

Before using these examples, ensure you have:

1. **Installed azureauth CLI**
   - Windows: See [installation instructions](https://github.com/AzureAD/microsoft-authentication-cli#windows)
   - macOS: See [installation instructions](https://github.com/AzureAD/microsoft-authentication-cli#macos)
   - Verify installation: `azureauth --version`

2. **Azure AD Application Registration**
   - Create an app registration in Azure Portal
   - Configure redirect URIs:
     - For WAM (Windows): `ms-appx-web://Microsoft.AAD.BrokerPlugin/<ClientID>`
     - For system web browser: `http://localhost`
   - Enable "Allow public client flows"
   - Note your Client ID, Tenant ID

3. **Resource/API Configuration**
   - Know the Resource ID (API ID) you want to authenticate to
   - Ensure your app has permissions to access the resource

## Example 1: Interactive Authentication (Default)

This is the most common authentication flow, opening a browser for user login.

```javascript
{
  "clientId": "73e5793e-8f71-4da2-9f71-575cb3019b37",
  "resourceId": "67eeda51-3891-4101-a0e3-bf0c64047157",
  "tenantId": "a3be859b-7f9a-4955-98ed-f3602dbd954c",
  "output": "json"
}
```

**Expected Response:**
```json
{
  "success": true,
  "output": "{...}",
  "user": "user@example.com",
  "displayName": "John Doe",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "expirationDate": "1234567890"
}
```

**Use case:** Desktop applications, CI/CD with manual trigger, development environments

## Example 2: Device Code Flow (Headless Environments)

For servers, containers, or headless Linux environments where a browser isn't available.

```javascript
{
  "clientId": "73e5793e-8f71-4da2-9f71-575cb3019b37",
  "resourceId": "67eeda51-3891-4101-a0e3-bf0c64047157",
  "tenantId": "a3be859b-7f9a-4955-98ed-f3602dbd954c",
  "output": "json",
  "mode": "device-code",
  "timeout": 20
}
```

**Expected Behavior:**
1. CLI outputs a device code and URL
2. User visits the URL on another device
3. User enters the device code
4. Authentication completes and token is returned

**Use case:** SSH sessions, Docker containers, headless Linux servers, automated pipelines requiring human approval

## Example 3: Silent Authentication (Token Cache)

Attempts to use cached credentials without user interaction.

```javascript
{
  "clientId": "73e5793e-8f71-4da2-9f71-575cb3019b37",
  "resourceId": "67eeda51-3891-4101-a0e3-bf0c64047157",
  "tenantId": "a3be859b-7f9a-4955-98ed-f3602dbd954c",
  "output": "json",
  "mode": "silent"
}
```

**Expected Response (Success):**
```json
{
  "success": true,
  "output": "{...}",
  "user": "user@example.com",
  "displayName": "John Doe",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "expirationDate": "1234567890"
}
```

**Expected Response (No Cache):**
```json
{
  "success": false,
  "error": "No cached token found. Please authenticate interactively first."
}
```

**Use case:** Background services, scheduled tasks after initial interactive login, high-frequency API calls

## Example 4: Token-Only Output

When you only need the raw access token without additional metadata.

```javascript
{
  "clientId": "73e5793e-8f71-4da2-9f71-575cb3019b37",
  "resourceId": "67eeda51-3891-4101-a0e3-bf0c64047157",
  "tenantId": "a3be859b-7f9a-4955-98ed-f3602dbd954c",
  "output": "token"
}
```

**Expected Response:**
```json
{
  "success": true,
  "output": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6..."
}
```

**Use case:** API calls, header construction, debugging, token inspection tools

## Example 5: Status Check

Check the authentication status and cache state without retrieving a token.

```javascript
{
  "clientId": "73e5793e-8f71-4da2-9f71-575cb3019b37",
  "resourceId": "67eeda51-3891-4101-a0e3-bf0c64047157",
  "tenantId": "a3be859b-7f9a-4955-98ed-f3602dbd954c",
  "output": "status"
}
```

**Expected Response:**
```json
{
  "success": true,
  "output": "Authentication cache is valid. User: user@example.com. Token expires: 2024-01-15T10:30:00Z"
}
```

**Use case:** Health checks, monitoring, cache validation, debugging authentication issues

## Example 6: Using Config Alias

Simplify repeated authentication by using a config file.

**Step 1: Create config file** (`~/.azureauth/config.toml` or custom path)

```toml
[alias.production-api]
resource = "67eeda51-3891-4101-a0e3-bf0c64047157"
client = "73e5793e-8f71-4da2-9f71-575cb3019b37"
tenant = "a3be859b-7f9a-4955-98ed-f3602dbd954c"
domain = "contoso.com"

[alias.staging-api]
resource = "ab7e45b7-ea4c-458c-97bd-670ccb543376"
client = "73e5793e-8f71-4da2-9f71-575cb3019b37"
tenant = "a3be859b-7f9a-4955-98ed-f3602dbd954c"
domain = "contoso.com"
```

**Step 2: Set environment variable**

```bash
# Linux/macOS
export AZUREAUTH_CONFIG=~/.azureauth/config.toml

# Windows PowerShell
$env:AZUREAUTH_CONFIG="$HOME\.azureauth\config.toml"
```

**Step 3: Use alias in tool call**

```javascript
{
  "alias": "production-api",
  "output": "json"
}
```

**Benefits:**
- Centralized configuration management
- Easy switching between environments
- Reduced chance of misconfiguration
- Simplified automation scripts

**Use case:** Multi-environment deployments, team-shared configurations, complex setups

## Example 7: Extended Timeout for Slow Networks

For environments with slow network connections or when users need more time to authenticate.

```javascript
{
  "clientId": "73e5793e-8f71-4da2-9f71-575cb3019b37",
  "resourceId": "67eeda51-3891-4101-a0e3-bf0c64047157",
  "tenantId": "a3be859b-7f9a-4955-98ed-f3602dbd954c",
  "output": "json",
  "mode": "device-code",
  "timeout": 30
}
```

**Note:** Timeout is specified in minutes (30 = 30 minutes)

**Use case:** Remote locations, VPN connections, multi-factor authentication with delays

## Error Handling Examples

### Error 1: azureauth Not Installed

**Response:**
```json
{
  "success": false,
  "error": "azureauth CLI is not installed. Please install it from https://github.com/AzureAD/microsoft-authentication-cli",
  "installInstructions": {
    "windows": "Run PowerShell script from: https://github.com/AzureAD/microsoft-authentication-cli#windows",
    "macOS": "Run shell script from: https://github.com/AzureAD/microsoft-authentication-cli#macos"
  }
}
```

**Solution:** Install azureauth CLI using the provided instructions

### Error 2: Invalid Parameters

**Response:**
```json
{
  "success": false,
  "error": "Validation error: clientId: String must contain at least 1 character(s)"
}
```

**Solution:** Ensure all required parameters (clientId, resourceId, tenantId) are non-empty strings

### Error 3: Authentication Timeout

**Response:**
```json
{
  "success": false,
  "error": "Authentication timed out. You may need to increase the timeout value or try device code flow."
}
```

**Solution:** 
- Increase `timeout` parameter value
- Switch to `mode: "device-code"` for headless environments
- Check network connectivity

### Error 4: Invalid Credentials

**Response:**
```json
{
  "success": false,
  "error": "Authentication failed: AADSTS50126: Invalid username or password"
}
```

**Solution:** Verify credentials, check Azure AD user account status, ensure MFA is configured correctly

## Best Practices

1. **Use Silent Mode After Initial Login**
   - First authentication: Use `interactive` or `device-code`
   - Subsequent calls: Use `silent` to leverage token cache
   - Fallback to `interactive` if silent fails

2. **Configure Appropriate Timeouts**
   - Default (15 min): Most scenarios
   - Short (5-10 min): Quick interactive flows
   - Long (20-30 min): Device code flow, MFA scenarios

3. **Use Config Aliases for Teams**
   - Store aliases in version control (without secrets)
   - Document alias names and purposes
   - Use environment-specific aliases (dev, staging, prod)

4. **Handle Token Expiration**
   - Check `expirationDate` in response
   - Re-authenticate before token expires
   - Implement retry logic for expired tokens

5. **Security Considerations**
   - Never log full access tokens
   - Store tokens securely (use OS credential stores)
   - Rotate credentials regularly
   - Use least-privilege resource access

6. **Error Handling**
   - Always check `success` field in response
   - Implement retry logic for network errors
   - Provide user-friendly error messages
   - Log errors for debugging

## Integration Example: Making API Calls

Here's a complete example of authenticating and using the token:

```javascript
// Step 1: Authenticate
const authRequest = {
  "clientId": "73e5793e-8f71-4da2-9f71-575cb3019b37",
  "resourceId": "67eeda51-3891-4101-a0e3-bf0c64047157",
  "tenantId": "a3be859b-7f9a-4955-98ed-f3602dbd954c",
  "output": "json",
  "mode": "silent"
};

// Step 2: Parse response
const authResponse = JSON.parse(result);

if (authResponse.success) {
  const accessToken = authResponse.token;
  
  // Step 3: Use token in API call
  const headers = {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };
  
  // Step 4: Make API request
  // (Implementation depends on your HTTP library)
  
} else {
  // Handle authentication failure
  console.error("Authentication failed:", authResponse.error);
  
  // Retry with interactive mode if silent failed
  if (authResponse.error.includes("No cached token")) {
    // Retry with interactive mode
  }
}
```

## Troubleshooting

### Issue: "azureauth: command not found"

**Cause:** azureauth CLI is not installed or not in PATH

**Solution:**
1. Verify installation: `azureauth --version`
2. Check PATH:
   - macOS/Linux: `echo $PATH`
   - Windows: `echo $env:PATH`
3. Reinstall if necessary
4. Restart terminal/IDE after installation

### Issue: "Interactive authentication fails on headless Linux"

**Cause:** No display server available for browser authentication

**Solution:** Use device code flow:
```javascript
{
  "mode": "device-code"
}
```

### Issue: "Token expired" errors

**Cause:** Cached token has expired

**Solution:**
- Clear cache: Delete files in `~/.azureauth` (macOS/Linux) or `%LOCALAPPDATA%\AzureAuth` (Windows)
- Re-authenticate with interactive mode
- Implement token refresh logic in your application

### Issue: Slow authentication performance

**Cause:** Network latency, MFA delays

**Solution:**
- Increase timeout value
- Use silent mode after initial authentication
- Consider caching tokens at application level
- Check network connectivity

## Additional Resources

- [microsoft-authentication-cli GitHub](https://github.com/AzureAD/microsoft-authentication-cli)
- [Azure AD App Registration Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [MSAL.NET Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-dotnet)
- [Azure AD Authentication Flows](https://docs.microsoft.com/en-us/azure/active-directory/develop/authentication-flows-app-scenarios)

## Support

For issues related to:
- **MCP Tool**: Open an issue on [Darbot-Deepmind-MCP GitHub](https://github.com/darbotlabs/Darbot-Deepmind-MCP/issues)
- **azureauth CLI**: Open an issue on [microsoft-authentication-cli GitHub](https://github.com/AzureAD/microsoft-authentication-cli/issues)
- **Azure AD**: Contact [Azure Support](https://azure.microsoft.com/support/)
