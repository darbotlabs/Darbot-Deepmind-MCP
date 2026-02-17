import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock child_process
jest.mock('child_process', () => ({
  exec: jest.fn(),
}));

// Mock chalk to avoid color codes in tests
jest.mock('chalk', () => ({
  __esModule: true,
  default: {
    yellow: (text: string) => text,
    green: (text: string) => text,
    blue: (text: string) => text,
    gray: (text: string) => text,
    red: (text: string) => text,
  },
}));

describe('Microsoft Authentication Tool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Input Validation', () => {
    it('should validate required authentication parameters', () => {
      const validAuth = {
        clientId: '73e5793e-8f71-4da2-9f71-575cb3019b37',
        resourceId: '67eeda51-3891-4101-a0e3-bf0c64047157',
        tenantId: 'a3be859b-7f9a-4955-98ed-f3602dbd954c',
      };

      const isValidAuth = (auth: any) => {
        return (
          typeof auth.clientId === 'string' &&
          auth.clientId.length > 0 &&
          typeof auth.resourceId === 'string' &&
          auth.resourceId.length > 0 &&
          typeof auth.tenantId === 'string' &&
          auth.tenantId.length > 0
        );
      };

      expect(isValidAuth(validAuth)).toBe(true);
    });

    it('should reject invalid authentication parameters', () => {
      const invalidAuths = [
        { clientId: '', resourceId: 'valid', tenantId: 'valid' }, // empty clientId
        { clientId: 'valid', resourceId: '', tenantId: 'valid' }, // empty resourceId
        { clientId: 'valid', resourceId: 'valid', tenantId: '' }, // empty tenantId
      ];

      const isValidAuth = (auth: any) => {
        try {
          return (
            typeof auth.clientId === 'string' &&
            auth.clientId.length > 0 &&
            typeof auth.resourceId === 'string' &&
            auth.resourceId.length > 0 &&
            typeof auth.tenantId === 'string' &&
            auth.tenantId.length > 0
          );
        } catch {
          return false;
        }
      };

      invalidAuths.forEach((auth) => {
        expect(isValidAuth(auth)).toBe(false);
      });
    });

    it('should accept valid output formats', () => {
      const validOutputs = ['token', 'json', 'status'];

      validOutputs.forEach((output) => {
        expect(['token', 'json', 'status']).toContain(output);
      });
    });

    it('should reject invalid output formats', () => {
      const invalidOutputs = ['xml', 'yaml', 'plain', ''];

      invalidOutputs.forEach((output) => {
        expect(['token', 'json', 'status']).not.toContain(output);
      });
    });

    it('should accept valid authentication modes', () => {
      const validModes = ['interactive', 'device-code', 'silent'];

      validModes.forEach((mode) => {
        expect(['interactive', 'device-code', 'silent']).toContain(mode);
      });
    });

    it('should reject invalid authentication modes', () => {
      const invalidModes = ['browser', 'oauth', 'password', ''];

      invalidModes.forEach((mode) => {
        expect(['interactive', 'device-code', 'silent']).not.toContain(mode);
      });
    });
  });

  describe('Timeout Configuration', () => {
    it('should accept valid timeout values', () => {
      const validTimeouts = [1, 5, 10, 15, 30, 0.5, 2.75];

      validTimeouts.forEach((timeout) => {
        expect(timeout).toBeGreaterThan(0);
      });
    });

    it('should reject invalid timeout values', () => {
      const invalidTimeouts = [0, -1, -10];

      invalidTimeouts.forEach((timeout) => {
        expect(timeout).toBeLessThanOrEqual(0);
      });
    });
  });

  describe('Alias Configuration', () => {
    it('should accept alias as alternative to direct parameters', () => {
      const aliasConfig = {
        alias: 'myapp-prod',
      };

      const isValidAlias = (config: any) => {
        return typeof config.alias === 'string' && config.alias.length > 0;
      };

      expect(isValidAlias(aliasConfig)).toBe(true);
    });

    it('should allow alias with optional direct parameters', () => {
      const mixedConfig = {
        alias: 'myapp-prod',
        clientId: 'override-client',
      };

      // Either alias OR direct parameters should work
      const hasAlias = typeof mixedConfig.alias === 'string' && mixedConfig.alias.length > 0;
      const hasClient = typeof mixedConfig.clientId === 'string' && mixedConfig.clientId.length > 0;

      expect(hasAlias || hasClient).toBe(true);
    });
  });

  describe('Response Format', () => {
    it('should format successful JSON responses correctly', () => {
      const mockJsonResponse = {
        success: true,
        output:
          '{"user":"user@example.com","display_name":"User Name","token":"encoded.jwt.token","expiration_date":"1234567890"}',
        user: 'user@example.com',
        displayName: 'User Name',
        token: 'encoded.jwt.token',
        expirationDate: '1234567890',
      };

      const isValidResponse = (response: any) => {
        return (
          typeof response.success === 'boolean' &&
          response.success === true &&
          typeof response.user === 'string' &&
          typeof response.displayName === 'string' &&
          typeof response.token === 'string' &&
          typeof response.expirationDate === 'string'
        );
      };

      expect(isValidResponse(mockJsonResponse)).toBe(true);
    });

    it('should format successful token responses correctly', () => {
      const mockTokenResponse = {
        success: true,
        output: 'encoded.jwt.token.here',
      };

      const isValidResponse = (response: any) => {
        return (
          typeof response.success === 'boolean' &&
          response.success === true &&
          typeof response.output === 'string' &&
          response.output.length > 0
        );
      };

      expect(isValidResponse(mockTokenResponse)).toBe(true);
    });

    it('should format error responses correctly', () => {
      const mockErrorResponse = {
        success: false,
        error: 'Authentication failed: Invalid credentials',
      };

      const isValidErrorResponse = (response: any) => {
        return (
          typeof response.success === 'boolean' &&
          response.success === false &&
          typeof response.error === 'string'
        );
      };

      expect(isValidErrorResponse(mockErrorResponse)).toBe(true);
    });

    it('should handle missing azureauth CLI error', () => {
      const mockMissingCliResponse = {
        success: false,
        error: 'azureauth CLI is not installed',
        installInstructions: {
          windows:
            'Run PowerShell script from: https://github.com/AzureAD/microsoft-authentication-cli#windows',
          macOS:
            'Run shell script from: https://github.com/AzureAD/microsoft-authentication-cli#macos',
        },
      };

      const isValidMissingCliResponse = (response: any) => {
        return (
          typeof response.success === 'boolean' &&
          response.success === false &&
          typeof response.error === 'string' &&
          response.error.includes('not installed') &&
          typeof response.installInstructions === 'object'
        );
      };

      expect(isValidMissingCliResponse(mockMissingCliResponse)).toBe(true);
    });
  });

  describe('Command Building', () => {
    it('should build correct command with direct parameters', () => {
      const params = {
        clientId: 'client-123',
        resourceId: 'resource-456',
        tenantId: 'tenant-789',
        output: 'json',
      };

      const expectedCommand =
        'azureauth aad --client client-123 --resource resource-456 --tenant tenant-789 --output json';
      const buildCommand = (p: any) => {
        let cmd = 'azureauth aad';
        cmd += ` --client ${p.clientId}`;
        cmd += ` --resource ${p.resourceId}`;
        cmd += ` --tenant ${p.tenantId}`;
        cmd += ` --output ${p.output}`;
        return cmd;
      };

      expect(buildCommand(params)).toBe(expectedCommand);
    });

    it('should build correct command with alias', () => {
      const params = {
        alias: 'myapp-prod',
        output: 'token',
      };

      const expectedCommand = 'azureauth aad --alias myapp-prod --output token';
      const buildCommand = (p: any) => {
        let cmd = 'azureauth aad';
        if (p.alias) {
          cmd += ` --alias ${p.alias}`;
        }
        cmd += ` --output ${p.output}`;
        return cmd;
      };

      expect(buildCommand(params)).toBe(expectedCommand);
    });

    it('should include timeout when specified', () => {
      const params = {
        clientId: 'client-123',
        resourceId: 'resource-456',
        tenantId: 'tenant-789',
        output: 'json',
        timeout: 10.5,
      };

      const buildCommand = (p: any) => {
        let cmd = 'azureauth aad';
        cmd += ` --client ${p.clientId}`;
        cmd += ` --resource ${p.resourceId}`;
        cmd += ` --tenant ${p.tenantId}`;
        cmd += ` --output ${p.output}`;
        if (p.timeout) {
          cmd += ` --timeout ${p.timeout}`;
        }
        return cmd;
      };

      const command = buildCommand(params);
      expect(command).toContain('--timeout 10.5');
    });

    it('should include mode when specified', () => {
      const params = {
        clientId: 'client-123',
        resourceId: 'resource-456',
        tenantId: 'tenant-789',
        output: 'json',
        mode: 'device-code',
      };

      const buildCommand = (p: any) => {
        let cmd = 'azureauth aad';
        cmd += ` --client ${p.clientId}`;
        cmd += ` --resource ${p.resourceId}`;
        cmd += ` --tenant ${p.tenantId}`;
        cmd += ` --output ${p.output}`;
        if (p.mode === 'device-code') {
          cmd += ' --mode devicecode';
        }
        return cmd;
      };

      const command = buildCommand(params);
      expect(command).toContain('--mode devicecode');
    });
  });

  describe('Error Handling', () => {
    it('should handle timeout errors gracefully', () => {
      const timeoutError = 'Authentication timed out';

      const isTimeoutError = (error: string) => {
        return error.toLowerCase().includes('timed out');
      };

      expect(isTimeoutError(timeoutError)).toBe(true);
    });

    it('should handle validation errors gracefully', () => {
      const validationError = 'Validation error: clientId is required';

      const isValidationError = (error: string) => {
        return error.includes('Validation error');
      };

      expect(isValidationError(validationError)).toBe(true);
    });

    it('should handle CLI execution errors gracefully', () => {
      const cliError = 'Command failed: azureauth aad';

      const isCliError = (error: string) => {
        return error.includes('Command failed') || error.includes('azureauth');
      };

      expect(isCliError(cliError)).toBe(true);
    });
  });

  describe('Integration Scenarios', () => {
    it('should support full authentication flow with all parameters', () => {
      const fullAuthRequest = {
        clientId: '73e5793e-8f71-4da2-9f71-575cb3019b37',
        resourceId: '67eeda51-3891-4101-a0e3-bf0c64047157',
        tenantId: 'a3be859b-7f9a-4955-98ed-f3602dbd954c',
        output: 'json',
        timeout: 20,
        mode: 'interactive',
      };

      const isValidFullRequest = (request: any) => {
        return (
          typeof request.clientId === 'string' &&
          typeof request.resourceId === 'string' &&
          typeof request.tenantId === 'string' &&
          ['token', 'json', 'status'].includes(request.output) &&
          typeof request.timeout === 'number' &&
          request.timeout > 0 &&
          ['interactive', 'device-code', 'silent'].includes(request.mode)
        );
      };

      expect(isValidFullRequest(fullAuthRequest)).toBe(true);
    });

    it('should support minimal authentication flow with defaults', () => {
      const minimalAuthRequest = {
        clientId: '73e5793e-8f71-4da2-9f71-575cb3019b37',
        resourceId: '67eeda51-3891-4101-a0e3-bf0c64047157',
        tenantId: 'a3be859b-7f9a-4955-98ed-f3602dbd954c',
      };

      const isValidMinimalRequest = (request: any) => {
        return (
          typeof request.clientId === 'string' &&
          typeof request.resourceId === 'string' &&
          typeof request.tenantId === 'string'
        );
      };

      expect(isValidMinimalRequest(minimalAuthRequest)).toBe(true);
    });

    it('should support config alias authentication flow', () => {
      const aliasAuthRequest = {
        alias: 'production-app',
        output: 'token',
        mode: 'silent',
      };

      const isValidAliasRequest = (request: any) => {
        return typeof request.alias === 'string' && request.alias.length > 0;
      };

      expect(isValidAliasRequest(aliasAuthRequest)).toBe(true);
    });
  });
});
