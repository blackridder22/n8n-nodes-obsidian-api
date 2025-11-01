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