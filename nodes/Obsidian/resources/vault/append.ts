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