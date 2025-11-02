This is a great project\! Building an n8n node for the Obsidian Local REST API based on the MCP server's capabilities is a perfect use case.

I will structure this new node package, `n8n-nodes-obsidian`, by following the declarative, resource-based template from the `n8n-nodes-starter`. I will port all the tools defined in the `mcp-obsidian` Python files into n8n resources and operations.

Here is the complete file structure and content for your new `n8n-nodes-obsidian` package.

-----

## `package.json`

This file defines your node package, name, and registers all the node and credential files.

```json
{
	"name": "n8n-nodes-obsidian",
	"version": "1.0.0",
	"description": "n8n node for the Obsidian Local REST API",
	"license": "MIT",
	"homepage": "https://github.com/werley/n8n-nodes-obsidian",
	"keywords": [
		"n8n-community-node-package"
	],
	"author": {
		"name": "Werley",
		"email": ""
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/werley/n8n-nodes-obsidian.git"
	},
	"scripts": {
		"build": "n8n-node build",
		"build:watch": "tsc --watch",
		"dev": "n8n-node dev",
		"lint": "n8n-node lint",
		"lint:fix": "n8n-node lint --fix",
		"release": "n8n-node release",
		"prepublishOnly": "n8n-node prerelease"
	},
	"files": [
		"dist"
	],
	"n8n": {
		"n8nNodesApiVersion": 1,
		"strict": true,
		"credentials": [
			"dist/credentials/ObsidianApi.credentials.js"
		],
		"nodes": [
			"dist/nodes/Obsidian/Obsidian.node.js"
		]
	},
	"devDependencies": {
		"@n8n/node-cli": "*",
		"eslint": "9.32.0",
		"prettier": "3.6.2",
		"release-it": "^19.0.4",
		"typescript": "5.9.2"
	},
	"peerDependencies": {
		"n8n-workflow": "*"
	}
}
```

-----

## Credentials

This credential file will store your API key, host, and port, just as you requested.

### `credentials/ObsidianApi.credentials.ts`

```typescript
import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ObsidianApi implements ICredentialType {
	name = 'obsidianApi';

	displayName = 'Obsidian API';

	icon: Icon = { light: 'file:../icons/obsidian.svg', dark: 'file:../icons/obsidian.dark.svg' };

	documentationUrl =
		'https://github.com/coddingtonbear/obsidian-local-rest-api/wiki/Authorizing-Requests';

	properties: INodeProperties[] = [
		{
			displayName: 'Protocol',
			name: 'protocol',
			type: 'options',
			options: [
				{
					name: 'http',
					value: 'http',
				},
				{
					name: 'https',
					value: 'https',
				},
			],
			default: 'http',
		},
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			default: '127.0.0.1',
			description: 'The host of your Obsidian Local REST API plugin',
		},
		{
			displayName: 'Port',
			name: 'port',
			type: 'number',
			default: 27123,
			description: 'The port of your Obsidian Local REST API plugin (default 27123 for http)',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'The API Key from the Obsidian Local REST API plugin settings',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.protocol}}://{{$credentials?.host}}:{{$credentials?.port}}',
			url: '/',
			method: 'GET',
		},
	};
}
```

-----

## Node Definition (`Obsidian.node.ts`)

This is the main file for the node. It defines the node itself and brings in all the resources.

### `nodes/Obsidian/Obsidian.node.ts`

```typescript
import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { vaultDescription } from './resources/vault';
import { searchDescription } from './resources/search';
import { periodicDescription } from './resources/periodic';
import { recentDescription } from './resources/recent';

export class Obsidian implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Obsidian',
		name: 'obsidian',
		icon: { light: 'file:obsidian.svg', dark: 'file:obsidian.dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with your Obsidian vault via the Local REST API',
		defaults: {
			name: 'Obsidian',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'obsidianApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials?.protocol}}://{{$credentials?.host}}:{{$credentials?.port}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Vault',
						value: 'vault',
						description: 'Interact with files and directories in your vault',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Perform simple or complex searches',
					},
					{
						name: 'Periodic Note',
						value: 'periodic',
						description: 'Get periodic (daily, weekly, etc.) notes',
					},
					{
						name: 'Recent',
						value: 'recent',
						description: 'Get recently modified files',
					},
				],
				default: 'vault',
			},
			// Add all resource descriptions
			...vaultDescription,
			...searchDescription,
			...periodicDescription,
			...recentDescription,
		],
	};
}
```

-----

## Resources & Operations

Here is the implementation for all the tools, broken down into resources (`vault`, `search`, `periodic`, `recent`) and their respective operations.

### Resource: `vault`

Handles all file-system-like operations.

#### `nodes/Obsidian/resources/vault/index.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';
import { vaultListDescription } from './list';
import { vaultGetDescription } from './get';
import { vaultCreateUpdateDescription } from './createUpdate';
import { vaultAppendDescription } from './append';
import { vaultPatchDescription } from './patch';
import { vaultDeleteDescription } from './delete';

const showForResource = {
	resource: ['vault'],
};

export const vaultDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForResource,
		},
		options: [
			{
				name: 'List Files',
				value: 'list',
				action: 'List files in a directory',
				description: 'Lists all files and directories in a specific Obsidian directory',
				routing: {
					request: {
						method: 'GET',
						url: '=/vault/{{$parameter.dirpath}}/',
					},
				},
			},
			{
				name: 'Get File Content',
				value: 'get',
				action: 'Get the content of a file',
				description: 'Return the content of a single file in your vault',
				routing: {
					request: {
						method: 'GET',
						url: '=/vault/{{$parameter.filepath}}',
						headers: {
							// Handle 'content' vs 'metadata' from mcp-obsidian/tools.py
							Accept:
								'={{$parameter.format === "json" ? "application/vnd.olrapi.note+json" : "text/markdown"}}',
						},
					},
				},
			},
			{
				name: 'Create or Update File',
				value: 'createUpdate',
				action: 'Create or update a file',
				description: 'Create a new file or update the content of an existing one',
				routing: {
					request: {
						method: 'PUT',
						url: '=/vault/{{$parameter.filepath}}',
						body: '={{$parameter.content}}',
						headers: {
							'Content-Type': 'text/markdown',
						},
					},
				},
			},
			{
				name: 'Append to File',
				value: 'append',
				action: 'Append content to a file',
				description: 'Append content to a new or existing file in the vault',
				routing: {
					request: {
						method: 'POST',
						url: '=/vault/{{$parameter.filepath}}',
						body: '={{$parameter.content}}',
						headers: {
							'Content-Type': 'text/markdown',
						},
					},
				},
			},
			{
				name: 'Patch File Content',
				value: 'patch',
				action: 'Patch content in a file',
				description:
					'Insert content into an existing note relative to a heading, block, or frontmatter',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/vault/{{$parameter.filepath}}',
						body: '={{$parameter.content}}',
						headers: {
							'Content-Type': 'text/markdown',
							Operation: '={{$parameter.patchOperation}}',
							'Target-Type': '={{$parameter.targetType}}',
							Target: '={{$parameter.target}}',
						},
					},
				},
			},
			{
				name: 'Delete File',
				value: 'delete',
				action: 'Delete a file or directory',
				description: 'Delete a file or directory from the vault',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/vault/{{$parameter.filepath}}',
					},
				},
			},
		],
		default: 'list',
	},
	...vaultListDescription,
	...vaultGetDescription,
	...vaultCreateUpdateDescription,
	...vaultAppendDescription,
	...vaultPatchDescription,
	...vaultDeleteDescription,
];
```

#### `nodes/Obsidian/resources/vault/list.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['list'],
	resource: ['vault'],
};

export const vaultListDescription: INodeProperties[] = [
	{
		displayName: 'Directory Path',
		name: 'dirpath',
		type: 'string',
		default: '',
		displayOptions: {
			show: showForOperation,
		},
		placeholder: 'e.g., "CRM/Contacts/"',
		description: 'Path to list files from (relative to vault root). Leave empty for vault root.',
	},
];
```

#### `nodes/Obsidian/resources/vault/get.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['get'],
	resource: ['vault'],
};

export const vaultGetDescription: INodeProperties[] = [
	{
		displayName: 'File Path',
		name: 'filepath',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		placeholder: 'e.g., "Daily/2025-11-01.md"',
		description: 'Path to the file to read (relative to vault root)',
	},
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		options: [
			{
				name: 'Markdown Content',
				value: 'markdown',
				description: 'Return just the content in Markdown format',
			},
			{
				name: 'JSON Metadata',
				value: 'json',
				description: 'Includes note metadata (paths, tags, etc.) and the content',
			},
		],
		default: 'markdown',
		displayOptions: {
			show: showForOperation,
		},
		description: 'The type of data to get',
	},
];
```

#### `nodes/Obsidian/resources/vault/createUpdate.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['createUpdate'],
	resource: ['vault'],
};

export const vaultCreateUpdateDescription: INodeProperties[] = [
	{
		displayName: 'File Path',
		name: 'filepath',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		placeholder: 'e.g., "New Note.md"',
		description: 'Path to the file to create or update (relative to vault root)',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			rows: 10,
		},
		displayOptions: {
			show: showForOperation,
		},
		description: 'Content to write to the file',
	},
];
```

#### `nodes/Obsidian/resources/vault/append.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['append'],
	resource: ['vault'],
};

export const vaultAppendDescription: INodeProperties[] = [
	{
		displayName: 'File Path',
		name: 'filepath',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		placeholder: 'e.g., "Logbook.md"',
		description: 'Path to the file to append to (relative to vault root)',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			rows: 5,
		},
		displayOptions: {
			show: showForOperation,
		},
		description: 'Content to append to the file',
	},
];
```

#### `nodes/Obsidian/resources/vault/patch.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['patch'],
	resource: ['vault'],
};

export const vaultPatchDescription: INodeProperties[] = [
	{
		displayName: 'File Path',
		name: 'filepath',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		placeholder: 'e.g., "Meetings/Project X.md"',
		description: 'Path to the file to patch (relative to vault root)',
	},
	{
		displayName: 'Patch Operation',
		name: 'patchOperation',
		type: 'options',
		options: [
			{
				name: 'Append',
				value: 'append',
			},
			{
				name: 'Prepend',
				value: 'prepend',
			},
			{
				name: 'Replace',
				value: 'replace',
			},
		],
		default: 'append',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		description: 'Operation to perform (append, prepend, or replace)',
	},
	{
		displayName: 'Target Type',
		name: 'targetType',
		type: 'options',
		options: [
			{
				name: 'Heading',
				value: 'heading',
			},
			{
				name: 'Block',
				value: 'block',
			},
			{
				name: 'Frontmatter',
				value: 'frontmatter',
			},
		],
		default: 'heading',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		description: 'Type of target to patch',
	},
	{
		displayName: 'Target',
		name: 'target',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		placeholder: 'e.g., "## Tasks" or "^block-id" or "tags"',
		description: 'Target identifier (heading path, block reference, or frontmatter field)',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			rows: 5,
		},
		displayOptions: {
			show: showForOperation,
		},
		description: 'Content to insert',
	},
];
```

#### `nodes/Obsidian/resources/vault/delete.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['delete'],
	resource: ['vault'],
};

export const vaultDeleteDescription: INodeProperties[] = [
	{
		displayName: 'File Path',
		name: 'filepath',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		placeholder: 'e.g., "Old Note.md"',
		description: 'Path to the file or directory to delete (relative to vault root)',
	},
];
```

-----

### Resource: `search`

Handles simple and complex search operations.

#### `nodes/Obsidian/resources/search/index.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';
import { searchSimpleDescription } from './simple';
import { searchComplexDescription } from './complex';

const showForResource = {
	resource: ['search'],
};

export const searchDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForResource,
		},
		options: [
			{
				name: 'Simple Search',
				value: 'simple',
				action: 'Perform a simple text search',
				description: 'Search for documents matching a specified text query',
				routing: {
					request: {
						method: 'POST',
						url: '=/search/simple/',
						qs: {
							query: '={{$parameter.query}}',
							contextLength: '={{$parameter.contextLength}}',
						},
					},
				},
			},
			{
				name: 'Complex Search',
				value: 'complex',
				action: 'Perform a complex (DQL or JSONLogic) search',
				description: 'Search for documents using a Dataview or JsonLogic query',
				routing: {
					request: {
						method: 'POST',
						url: '=/search/',
						body: '={{$parameter.query}}',
						headers: {
							'Content-Type': '={{$parameter.queryType}}',
						},
					},
				},
			},
		],
		default: 'simple',
	},
	...searchSimpleDescription,
	...searchComplexDescription,
];
```

#### `nodes/Obsidian/resources/search/simple.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['simple'],
	resource: ['search'],
};

export const searchSimpleDescription: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		placeholder: 'Text to search for',
		description: 'Simple text to search for in the vault',
	},
	{
		displayName: 'Context Length',
		name: 'contextLength',
		type: 'number',
		default: 100,
		displayOptions: {
			show: showForOperation,
		},
		description: 'How much context to return around the matching string',
	},
];
```

#### `nodes/Obsidian/resources/search/complex.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['complex'],
	resource: ['search'],
};

export const searchComplexDescription: INodeProperties[] = [
	{
		displayName: 'Query Type',
		name: 'queryType',
		type: 'options',
		options: [
			{
				name: 'Dataview DQL',
				value: 'application/vnd.olrapi.dataview.dql+txt',
			},
			{
				name: 'JSONLogic',
				value: 'application/vnd.olrapi.jsonlogic+json',
			},
		],
		default: 'application/vnd.olrapi.dataview.dql+txt',
		displayOptions: {
			show: showForOperation,
		},
		description: 'The type of complex query to perform',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showForOperation,
				queryType: ['application/vnd.olrapi.dataview.dql+txt'],
			},
		},
		typeOptions: {
			rows: 10,
		},
		placeholder: 'TABLE file.mtime FROM #task SORT file.mtime DESC',
		description: 'The DQL query to execute',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'json',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showForOperation,
				queryType: ['application/vnd.olrapi.jsonlogic+json'],
			},
		},
		typeOptions: {
			rows: 10,
		},
		placeholder: '{\n  "glob": ["*.md", {"var": "path"}]\n}',
		description: 'The JSONLogic query to execute',
	},
];
```

-----

### Resource: `periodic`

Handles operations related to periodic notes.

#### `nodes/Obsidian/resources/periodic/index.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';
import { periodicGetDescription } from './get';
import { periodicGetRecentDescription } from './getRecent';

const showForResource = {
	resource: ['periodic'],
};

export const periodicDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForResource,
		},
		options: [
			{
				name: 'Get Note',
				value: 'get',
				action: 'Get a periodic note',
				description: 'Get current periodic note for the specified period',
				routing: {
					request: {
						method: 'GET',
						url: '=/periodic/{{$parameter.period}}/',
						headers: {
							Accept:
								'={{$parameter.format === "json" ? "application/vnd.olrapi.note+json" : "text/markdown"}}',
						},
					},
				},
			},
			{
				name: 'Get Recent Notes',
				value: 'getRecent',
				action: 'Get recent periodic notes',
				description: 'Get most recent periodic notes for the specified period type',
				routing: {
					request: {
						method: 'GET',
						url: '=/periodic/{{$parameter.period}}/recent',
						qs: {
							limit: '={{$parameter.limit}}',
							includeContent: '={{$parameter.includeContent}}',
						},
					},
				},
			},
		],
		default: 'get',
	},
	...periodicGetDescription,
	...periodicGetRecentDescription,
];
```

#### `nodes/Obsidian/resources/periodic/get.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['get'],
	resource: ['periodic'],
};

const periodOptions = [
	{ name: 'Daily', value: 'daily' },
	{ name: 'Weekly', value: 'weekly' },
	{ name: 'Monthly', value: 'monthly' },
	{ name: 'Quarterly', value: 'quarterly' },
	{ name: 'Yearly', value: 'yearly' },
];

export const periodicGetDescription: INodeProperties[] = [
	{
		displayName: 'Period',
		name: 'period',
		type: 'options',
		options: periodOptions,
		default: 'daily',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		description: 'The period type',
	},
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		options: [
			{
				name: 'Markdown Content',
				value: 'content',
				description: 'Return just the content in Markdown format',
			},
			{
				name: 'JSON Metadata',
				value: 'json',
				description: 'Includes note metadata (paths, tags, etc.) and the content',
			},
		],
		default: 'content',
		displayOptions: {
			show: showForOperation,
		},
		description: 'The type of data to get',
	},
];
```

#### `nodes/Obsidian/resources/periodic/getRecent.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['getRecent'],
	resource: ['periodic'],
};

const periodOptions = [
	{ name: 'Daily', value: 'daily' },
	{ name: 'Weekly', value: 'weekly' },
	{ name: 'Monthly', value: 'monthly' },
	{ name: 'Quarterly', value: 'quarterly' },
	{ name: 'Yearly', value: 'yearly' },
];

export const periodicGetRecentDescription: INodeProperties[] = [
	{
		displayName: 'Period',
		name: 'period',
		type: 'options',
		options: periodOptions,
		default: 'daily',
		required: true,
		displayOptions: {
			show: showForOperation,
		},
		description: 'The period type',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
		default: 5,
		displayOptions: {
			show: showForOperation,
		},
		description: 'Maximum number of notes to return',
	},
	{
		displayName: 'Include Content',
		name: 'includeContent',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showForOperation,
		},
		description: 'Whether to include note content',
	},
];
```

-----

### Resource: `recent`

Handles getting recently changed files.

#### `nodes/Obsidian/resources/recent/index.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';
import { recentGetRecentChangesDescription } from './getRecentChanges';

const showForResource = {
	resource: ['recent'],
};

export const recentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForResource,
		},
		options: [
			{
				name: 'Get Recent Changes',
				value: 'getRecentChanges',
				action: 'Get recently modified files',
				description: 'Get recently modified files in the vault',
				routing: {
					request: {
						method: 'POST',
						url: '=/search/',
						headers: {
							'Content-Type': 'application/vnd.olrapi.dataview.dql+txt',
						},
						// This body is dynamic based on parameters, as defined in mcp-obsidian/tools.py
						body: '={{ `TABLE file.mtime\nWHERE file.mtime >= date(today) - dur(${$parameter.days} days)\nSORT file.mtime DESC\nLIMIT ${$parameter.limit}` }}',
					},
				},
			},
		],
		default: 'getRecentChanges',
	},
	...recentGetRecentChangesDescription,
];
```

#### `nodes/Obsidian/resources/recent/getRecentChanges.ts`

```typescript
import type { INodeProperties } from 'n8n-workflow';

const showForOperation = {
	operation: ['getRecentChanges'],
	resource: ['recent'],
};

export const recentGetRecentChangesDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 10,
		displayOptions: {
			show: showForOperation,
		},
		description: 'Maximum number of files to return',
	},
	{
		displayName: 'Days',
		name: 'days',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 90,
		displayOptions: {
			show: showForOperation,
		},
		description: 'Only include files modified within this many days',
	},
];
```

-----

## Icons

You will need to create these two SVG files. For now, they will be empty placeholders.

### `icons/obsidian.svg`

```svg
```

### `icons/obsidian.dark.svg`

```svg
```