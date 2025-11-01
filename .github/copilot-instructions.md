# n8n-nodes-obsidian Development Guide

This is an n8n community node package that provides integration with Obsidian's Local REST API. Follow these instructions to understand and contribute to the codebase effectively.

## Project Architecture

### Core Components
- **Node Structure**: Main node implementation is in `nodes/Obsidian/Obsidian.node.ts`
- **Resources**: Functionality is organized by resource types in `nodes/Obsidian/resources/`:
  - `vault/` - Core vault operations (CRUD operations)
  - `search/` - Search functionality (simple and complex)
  - `periodic/` - Periodic operations
  - `recent/` - Recent changes tracking

### Key Integration Points
1. **Obsidian Local REST API**: All operations communicate with Obsidian via its Local REST API
2. **n8n Workflow Integration**: Node implements `INodeType` interface for n8n compatibility

## Development Workflow

### Setup and Build
```bash
npm install        # Install dependencies
npm run build     # Build the project
npm run dev       # Development mode with watch
```

### Publishing
- Use `npm run release` to publish (not `npm publish` directly)
- Pre-release checks are enforced via `prepublishOnly` script

### Development Patterns
1. **Resource Organization**:
   - Each resource type (vault, search, etc.) has its own directory
   - Index files (`index.ts`) export resource descriptions
   - Operations are split into separate files by functionality

2. **API Integration**:
   - Base URL configuration: `{{$credentials?.protocol}}://{{$credentials?.host}}:{{$credentials?.port}}`
   - Credentials are managed through `credentials/ObsidianApi.credentials.ts`

## Important Conventions
1. **Node Structure**:
   - Operations are grouped by resource type
   - Each operation has a clear subtitle pattern: `={{$parameter["operation"] + ": " + $parameter["resource"]}}`

2. **Type Safety**:
   - Project uses strict TypeScript configuration
   - All API interfaces should be properly typed

## Debugging Tips
- Check Obsidian's Local REST API status and port configuration when testing
- Use `npm run lint` to catch common issues
- Enable n8n debug logs for detailed operation tracing