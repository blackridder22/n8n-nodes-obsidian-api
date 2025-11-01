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