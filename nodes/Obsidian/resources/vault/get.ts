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