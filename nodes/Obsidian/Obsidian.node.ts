import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { vaultDescription } from './resources/vault';
import { searchDescription } from './resources/search';
import { periodicDescription } from './resources/periodic';
import { recentDescription } from './resources/recent';

export class Obsidian implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Obsidian',
		name: 'obsidian',
		icon: { light: 'file:../../icons/obsidian.svg', dark: 'file:../../icons/obsidian.dark.svg' },
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