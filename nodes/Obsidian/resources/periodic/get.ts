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