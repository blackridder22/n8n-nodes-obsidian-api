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
		default: 50,
		displayOptions: {
			show: showForOperation,
		},
		description: 'Max number of results to return',
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