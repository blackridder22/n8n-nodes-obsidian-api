"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObsidianApi = void 0;
class ObsidianApi {
    constructor() {
        this.name = 'obsidianApi';
        this.displayName = 'Obsidian API';
        this.icon = { light: 'file:../icons/obsidian.svg', dark: 'file:../icons/obsidian.dark.svg' };
        this.documentationUrl = 'https://github.com/coddingtonbear/obsidian-local-rest-api/wiki/Authorizing-Requests';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials?.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.protocol}}://{{$credentials?.host}}:{{$credentials?.port}}',
                url: '/',
                method: 'GET',
            },
        };
    }
}
exports.ObsidianApi = ObsidianApi;
//# sourceMappingURL=ObsidianApi.credentials.js.map