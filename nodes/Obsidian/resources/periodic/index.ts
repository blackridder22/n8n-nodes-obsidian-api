import type { INodeProperties } from 'n8n-workflow';
import { periodicGetDescription } from './get';
import { periodicGetRecentDescription } from './getRecent';

const showForResource = {
	resource: ['periodic'],
};

export const periodicDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForResource,
		},
		options: [
			{
				name: 'Get Note',
				value: 'get',
				action: 'Get a periodic note',
				description: 'Get current periodic note for the specified period',
				routing: {
					request: {
						method: 'GET',
						url: '=/periodic/{{$parameter.period}}/',
						headers: {
							Accept:
								'={{$parameter.format === "json" ? "application/vnd.olrapi.note+json" : "text/markdown"}}',
						},
					},
				},
			},
			{
				name: 'Get Recent Notes',
				value: 'getRecent',
				action: 'Get recent periodic notes',
				description: 'Get most recent periodic notes for the specified period type',
				routing: {
					request: {
						method: 'GET',
						url: '=/periodic/{{$parameter.period}}/recent',
						qs: {
							limit: '={{$parameter.limit}}',
							includeContent: '={{$parameter.includeContent}}',
						},
					},
				},
			},
		],
		default: 'get',
	},
	...periodicGetDescription,
	...periodicGetRecentDescription,
];