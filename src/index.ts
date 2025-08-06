#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import chalk from 'chalk';

/**
 * Zod schema for validating darbot_deepmind tool inputs
 */
const DeepmindSchema = z.object({
  thought: z.string().min(1).describe("The current thinking step"),
  nextThoughtNeeded: z.boolean().describe("Whether another thought step is needed"),
  thoughtNumber: z.number().int().positive().describe("Current thought number"),
  totalThoughts: z.number().int().positive().describe("Estimated total thoughts needed"),
  isRevision: z.boolean().optional().describe("Whether this revises previous thinking"),
  revisesThought: z.number().int().positive().optional().describe("Which thought is being reconsidered"),
  branchFromThought: z.number().int().positive().optional().describe("Branching point thought number"),
  branchId: z.string().optional().describe("Branch identifier"),
  needsMoreThoughts: z.boolean().optional().describe("If more thoughts are needed"),
});

type DeepmindInput = z.infer<typeof DeepmindSchema>;

interface ThoughtResponse {
  thoughtNumber: number;
  totalThoughts: number;
  nextThoughtNeeded: boolean;
  branches: string[];
  thoughtHistoryLength: number;
  isRevision?: boolean;
  revisesThought?: number;
  branchId?: string;
  branchFromThought?: number;
  needsMoreThoughts?: boolean;
}

/**
 * Darbot Deepmind Server class implementing sophisticated reasoning capabilities
 */
class DarbotDeepmindServer {
  private thoughtHistory: DeepmindInput[] = [];
  private branches: Record<string, DeepmindInput[]> = {};
  private disableThoughtLogging: boolean;

  constructor() {
    this.disableThoughtLogging = process.env.DISABLE_THOUGHT_LOGGING?.toLowerCase() === "true";
  }

  /**
   * Formats a thought for beautiful console output
   */
  private formatThought(thoughtData: DeepmindInput): string {
    const { thoughtNumber, totalThoughts, thought, isRevision, revisesThought, branchFromThought, branchId } = thoughtData;

    let prefix = '';
    let context = '';

    if (isRevision) {
      prefix = chalk.yellow('🧠 Revision');
      context = ` (revising thought ${revisesThought})`;
    } else if (branchFromThought) {
      prefix = chalk.green('🚀 Branch');
      context = ` (from thought ${branchFromThought}, ID: ${branchId})`;
    } else {
      prefix = chalk.blue('⚡ Thought');
      context = '';
    }

    const header = `${prefix} ${thoughtNumber}/${totalThoughts}${context}`;
    const borderLength = Math.max(header.replace(/\x1b\[[0-9;]*m/g, '').length, thought.length) + 4;
    const border = '─'.repeat(borderLength);

    return `
┌${border}┐
│ ${header.padEnd(borderLength - 2)} │
├${border}┤
│ ${thought.padEnd(borderLength - 2)} │
└${border}┘`;
  }

  /**
   * Validates thought revision logic
   */
  private validateRevision(input: DeepmindInput): void {
    if (input.isRevision && input.revisesThought !== undefined) {
      if (input.revisesThought >= input.thoughtNumber) {
        throw new Error("Cannot revise a future thought. revisesThought must be less than current thoughtNumber.");
      }
      if (input.revisesThought < 1) {
        throw new Error("revisesThought must be a positive number.");
      }
    }
  }

  /**
   * Validates thought branching logic
   */
  private validateBranching(input: DeepmindInput): void {
    if (input.branchFromThought !== undefined) {
      if (input.branchFromThought >= input.thoughtNumber) {
        throw new Error("Cannot branch from a future thought. branchFromThought must be less than current thoughtNumber.");
      }
      if (!input.branchId) {
        throw new Error("branchId is required when branchFromThought is specified.");
      }
    }
  }

  /**
   * Adjusts total thoughts if current thought exceeds estimate
   */
  private adjustTotalThoughts(input: DeepmindInput): void {
    if (input.thoughtNumber > input.totalThoughts) {
      input.totalThoughts = input.thoughtNumber;
    }
  }

  /**
   * Processes a thought input and returns formatted response
   */
  public processThought(input: unknown): { content: Array<{ type: string; text: string }>; isError?: boolean } {
    try {
      // Validate input with Zod schema
      const validatedInput = DeepmindSchema.parse(input);

      // Additional validation
      this.validateRevision(validatedInput);
      this.validateBranching(validatedInput);
      this.adjustTotalThoughts(validatedInput);

      // Store in history
      this.thoughtHistory.push(validatedInput);

      // Handle branching
      if (validatedInput.branchFromThought && validatedInput.branchId) {
        if (!this.branches[validatedInput.branchId]) {
          this.branches[validatedInput.branchId] = [];
        }
        this.branches[validatedInput.branchId].push(validatedInput);
      }

      // Log thought if not disabled
      if (!this.disableThoughtLogging) {
        const formattedThought = this.formatThought(validatedInput);
        console.error(formattedThought);
      }

      // Prepare response
      const response: ThoughtResponse = {
        thoughtNumber: validatedInput.thoughtNumber,
        totalThoughts: validatedInput.totalThoughts,
        nextThoughtNeeded: validatedInput.nextThoughtNeeded,
        branches: Object.keys(this.branches),
        thoughtHistoryLength: this.thoughtHistory.length,
      };

      // Add optional fields if present
      if (validatedInput.isRevision) {
        response.isRevision = validatedInput.isRevision;
        response.revisesThought = validatedInput.revisesThought;
      }
      if (validatedInput.branchId) {
        response.branchId = validatedInput.branchId;
        response.branchFromThought = validatedInput.branchFromThought;
      }
      if (validatedInput.needsMoreThoughts !== undefined) {
        response.needsMoreThoughts = validatedInput.needsMoreThoughts;
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(response, null, 2)
        }]
      };

    } catch (error) {
      const errorMessage = error instanceof z.ZodError 
        ? `Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
        : error instanceof Error 
        ? error.message 
        : String(error);

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: errorMessage,
            status: 'failed'
          }, null, 2)
        }],
        isError: true
      };
    }
  }

  /**
   * Gets the current thought history
   */
  public getThoughtHistory(): DeepmindInput[] {
    return [...this.thoughtHistory];
  }

  /**
   * Gets the current branches
   */
  public getBranches(): Record<string, DeepmindInput[]> {
    return { ...this.branches };
  }

  /**
   * Clears the thought history and branches
   */
  public clearHistory(): void {
    this.thoughtHistory = [];
    this.branches = {};
  }
}

/**
 * MCP Tool definition for darbot_deepmind
 */
const DARBOT_DEEPMIND_TOOL: Tool = {
  name: "darbot_deepmind",
  description: `Darbot Deepmind: A sophisticated tool for dynamic and reflective problem-solving through structured thinking.
This tool helps analyze complex problems through an adaptive thinking process that evolves with understanding.
Each thought can build on, question, or revise previous insights as understanding deepens.

When to use this tool:
- Breaking down complex problems into steps
- Planning and design with room for revision
- Analysis that might need course correction
- Problems where the full scope might not be clear initially
- Problems that require a multi-step solution
- Tasks that need to maintain context over multiple steps
- Situations where irrelevant information needs to be filtered out

Key features:
- You can adjust total_thoughts up or down as you progress
- You can question or revise previous thoughts
- You can add more thoughts even after reaching what seemed like the end
- You can express uncertainty and explore alternative approaches
- Not every thought needs to build linearly - you can branch or backtrack
- Generates a solution hypothesis
- Verifies the hypothesis based on the Chain of Thought steps
- Repeats the process until satisfied
- Provides a correct answer

Parameters explained:
- thought: Your current thinking step, which can include:
  * Regular analytical steps
  * Revisions of previous thoughts
  * Questions about previous decisions
  * Realizations about needing more analysis
  * Changes in approach
  * Hypothesis generation
  * Hypothesis verification
- next_thought_needed: True if you need more thinking, even if at what seemed like the end
- thought_number: Current number in sequence (can go beyond initial total if needed)
- total_thoughts: Current estimate of thoughts needed (can be adjusted up/down)
- is_revision: A boolean indicating if this thought revises previous thinking
- revises_thought: If is_revision is true, which thought number is being reconsidered
- branch_from_thought: If branching, which thought number is the branching point
- branch_id: Identifier for the current branch (if any)
- needs_more_thoughts: If reaching end but realizing more thoughts needed

You should:
1. Start with an initial estimate of needed thoughts, but be ready to adjust
2. Feel free to question or revise previous thoughts
3. Don't hesitate to add more thoughts if needed, even at the "end"
4. Express uncertainty when present
5. Mark thoughts that revise previous thinking or branch into new paths
6. Ignore information that is irrelevant to the current step
7. Generate a solution hypothesis when appropriate
8. Verify the hypothesis based on the Chain of Thought steps
9. Repeat the process until satisfied with the solution
10. Provide a single, ideally correct answer as the final output
11. Only set next_thought_needed to false when truly done and a satisfactory answer is reached`,
  inputSchema: {
    type: "object",
    properties: {
      thought: {
        type: "string",
        description: "Your current thinking step"
      },
      nextThoughtNeeded: {
        type: "boolean",
        description: "Whether another thought step is needed"
      },
      thoughtNumber: {
        type: "integer",
        description: "Current thought number",
        minimum: 1
      },
      totalThoughts: {
        type: "integer",
        description: "Estimated total thoughts needed",
        minimum: 1
      },
      isRevision: {
        type: "boolean",
        description: "Whether this revises previous thinking"
      },
      revisesThought: {
        type: "integer",
        description: "Which thought is being reconsidered",
        minimum: 1
      },
      branchFromThought: {
        type: "integer",
        description: "Branching point thought number",
        minimum: 1
      },
      branchId: {
        type: "string",
        description: "Branch identifier"
      },
      needsMoreThoughts: {
        type: "boolean",
        description: "If more thoughts are needed"
      }
    },
    required: ["thought", "nextThoughtNeeded", "thoughtNumber", "totalThoughts"]
  }
};

/**
 * Main server setup and initialization
 */
async function main() {
  try {
    const server = new Server(
      {
        name: "darbot-deepmind-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    const thinkingServer = new DarbotDeepmindServer();

    // Handle list tools request
    server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [DARBOT_DEEPMIND_TOOL],
    }));

    // Handle call tool request
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === "darbot_deepmind") {
        return thinkingServer.processThought(request.params.arguments);
      }

      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${request.params.name}`
      );
    });

    // Connect to transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.error("Darbot Deepmind MCP Server running on stdio");
  } catch (error) {
    console.error("Fatal error running server:", error);
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});