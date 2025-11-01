import type { INodeProperties } from 'n8n-workflow';
import { recentGetRecentChangesDescription } from './getRecentChanges';

const showForResource = {
	resource: ['recent'],
};

export const recentDescription: INodeProperties[] = [
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
				name: 'Get Recent Changes',
				value: 'getRecentChanges',
				action: 'Get recently modified files',
				description: 'Get recently modified files in the vault',
				routing: {
					request: {
						method: 'POST',
						url: '=/search/',
						headers: {
							'Content-Type': 'application/vnd.olrapi.dataview.dql+txt',
						},
						// This body is dynamic based on parameters, as defined in mcp-obsidian/tools.py
						body: '={{ `TABLE file.mtime\nWHERE file.mtime >= date(today) - dur(${$parameter.days} days)\nSORT file.mtime DESC\nLIMIT ${$parameter.limit}` }}',
					},
				},
			},
		],
		default: 'getRecentChanges',
	},
	...recentGetRecentChangesDescription,
];