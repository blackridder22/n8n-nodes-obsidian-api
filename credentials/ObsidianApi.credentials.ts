import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ObsidianApi implements ICredentialType {
	name = 'obsidianApi';

	displayName = 'Obsidian API';

	icon: Icon = { light: 'file:../icons/obsidian.svg', dark: 'file:../icons/obsidian.dark.svg' };

	documentationUrl =
		'https://github.com/coddingtonbear/obsidian-local-rest-api/wiki/Authorizing-Requests';

	properties: INodeProperties[] = [
		{
			displayName: 'Protocol',
			name: 'protocol',
			type: 'options',
			options: [
				{
					name: 'http',
					value: 'http',
				},
				{
					name: 'https',
					value: 'https',
				},
			],
			default: 'http',
		},
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			default: '127.0.0.1',
			description: 'The host of your Obsidian Local REST API plugin',
		},
		{
			displayName: 'Port',
			name: 'port',
			type: 'number',
			default: 27123,
			description: 'The port of your Obsidian Local REST API plugin (default 27123 for http)',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'The API Key from the Obsidian Local REST API plugin settings',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.protocol}}://{{$credentials?.host}}:{{$credentials?.port}}',
			url: '/',
			method: 'GET',
		},
	};
}