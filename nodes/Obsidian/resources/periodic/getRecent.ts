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
		default: 50,
		displayOptions: {
			show: showForOperation,
		},
		description: 'Max number of results to return',
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