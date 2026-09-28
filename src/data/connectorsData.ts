import { MCPConnector } from '../@types';

export const INITIAL_CONNECTORS: MCPConnector[] = [
  {
    id: 'mcp-github',
    name: 'GitHub Repository MCP',
    endpoint: 'https://mcp.github.com/v1',
    description: 'Enables EchoGPT models to query PRs, issues, read repository code, and trigger CI workflows directly.',
    authHeader: 'Bearer ghp_************************',
    enabled: false,
    icon: 'GitBranch',
    category: 'Developer Tools'
  },
  {
    id: 'mcp-postgres',
    name: 'PostgreSQL Enterprise MCP',
    endpoint: 'https://mcp.internal-cluster.org/sql',
    description: 'Provides read-only analytical schema introspection and SQL generation with strict data masking.',
    authHeader: 'Bearer db_sec_********************',
    enabled: false,
    icon: 'Database',
    category: 'Databases'
  },
  {
    id: 'mcp-brave',
    name: 'Brave Realtime Web MCP',
    endpoint: 'https://mcp.brave.com/v2/search',
    description: 'Gives models instant access to live web search indexing without ad tracking or cookie retention.',
    authHeader: 'Bearer bsv_***********************',
    enabled: false,
    icon: 'Globe',
    category: 'Web Search'
  },
  {
    id: 'mcp-slack',
    name: 'Slack Team Channels MCP',
    endpoint: 'https://mcp.slack.corp/v1',
    description: 'Allows querying team discussion threads, channel decisions, and syncing updates into AI tasks.',
    authHeader: 'Bearer xoxb_**********************',
    enabled: false,
    icon: 'MessageSquare',
    category: 'Communication'
  }
];
