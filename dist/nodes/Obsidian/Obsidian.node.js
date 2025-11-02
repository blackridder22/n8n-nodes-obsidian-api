"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obsidian = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const vault_1 = require("./resources/vault");
const search_1 = require("./resources/search");
const periodic_1 = require("./resources/periodic");
const recent_1 = require("./resources/recent");
class Obsidian {
    constructor() {
        this.description = {
            displayName: 'Obsidian',
            name: 'obsidian',
            icon: { light: 'file:../../icons/obsidian.svg', dark: 'file:../../icons/obsidian.dark.svg' },
            group: ['input'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with your Obsidian vault via the Local REST API',
            defaults: {
                name: 'Obsidian',
            },
            usableAsTool: true,
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'obsidianApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: '={{$credentials?.protocol}}://{{$credentials?.host}}:{{$credentials?.port}}',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Vault',
                            value: 'vault',
                            description: 'Interact with files and directories in your vault',
                        },
                        {
                            name: 'Search',
                            value: 'search',
                            description: 'Perform simple or complex searches',
                        },
                        {
                            name: 'Periodic Note',
                            value: 'periodic',
                            description: 'Get periodic (daily, weekly, etc.) notes',
                        },
                        {
                            name: 'Recent',
                            value: 'recent',
                            description: 'Get recently modified files',
                        },
                    ],
                    default: 'vault',
                },
                ...vault_1.vaultDescription,
                ...search_1.searchDescription,
                ...periodic_1.periodicDescription,
                ...recent_1.recentDescription,
            ],
        };
    }
}
exports.Obsidian = Obsidian;
//# sourceMappingURL=Obsidian.node.js.map