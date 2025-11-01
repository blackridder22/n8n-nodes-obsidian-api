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