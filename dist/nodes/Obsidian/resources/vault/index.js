"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaultDescription = void 0;
const list_1 = require("./list");
const get_1 = require("./get");
const createUpdate_1 = require("./createUpdate");
const append_1 = require("./append");
const patch_1 = require("./patch");
const delete_1 = require("./delete");
const showForResource = {
    resource: ['vault'],
};
exports.vaultDescription = [
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
                name: 'Append to File',
                value: 'append',
                action: 'Append content to a file',
                description: 'Append content to a new or existing file in the vault',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/vault/{{$parameter.filepath}}',
                        body: '={{$parameter.content}}',
                        headers: {
                            'Content-Type': 'text/markdown',
                        },
                    },
                },
            },
            {
                name: 'Create or Update File',
                value: 'createUpdate',
                action: 'Create or update a file',
                description: 'Create a new file or update the content of an existing one',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/vault/{{$parameter.filepath}}',
                        body: '={{$parameter.content}}',
                        headers: {
                            'Content-Type': 'text/markdown',
                        },
                    },
                },
            },
            {
                name: 'Delete File',
                value: 'delete',
                action: 'Delete a file or directory',
                description: 'Delete a file or directory from the vault',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/vault/{{$parameter.filepath}}',
                    },
                },
            },
            {
                name: 'Get File Content',
                value: 'get',
                action: 'Get the content of a file',
                description: 'Return the content of a single file in your vault',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/vault/{{$parameter.filepath}}',
                        headers: {
                            Accept: '={{$parameter.format === "json" ? "application/vnd.olrapi.note+json" : "text/markdown"}}',
                        },
                    },
                },
            },
            {
                name: 'List Files',
                value: 'list',
                action: 'List files in a directory',
                description: 'Lists all files and directories in a specific Obsidian directory',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/vault/{{$parameter.dirpath}}/',
                    },
                },
            },
            {
                name: 'Patch File Content',
                value: 'patch',
                action: 'Patch content in a file',
                description: 'Insert content into an existing note relative to a heading, block, or frontmatter',
                routing: {
                    request: {
                        method: 'PATCH',
                        url: '=/vault/{{$parameter.filepath}}',
                        body: '={{$parameter.content}}',
                        headers: {
                            'Content-Type': 'text/markdown',
                            Operation: '={{$parameter.patchOperation}}',
                            'Target-Type': '={{$parameter.targetType}}',
                            Target: '={{$parameter.target}}',
                        },
                    },
                },
            },
        ],
        default: 'list',
    },
    ...list_1.vaultListDescription,
    ...get_1.vaultGetDescription,
    ...createUpdate_1.vaultCreateUpdateDescription,
    ...append_1.vaultAppendDescription,
    ...patch_1.vaultPatchDescription,
    ...delete_1.vaultDeleteDescription,
];
//# sourceMappingURL=index.js.map