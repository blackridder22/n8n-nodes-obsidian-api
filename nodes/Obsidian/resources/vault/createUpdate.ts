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