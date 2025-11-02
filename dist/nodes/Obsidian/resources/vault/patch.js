"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaultPatchDescription = void 0;
const showForOperation = {
    operation: ['patch'],
    resource: ['vault'],
};
exports.vaultPatchDescription = [
    {
        displayName: 'File Path',
        name: 'filepath',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showForOperation,
        },
        placeholder: 'e.g., "Meetings/Project X.md"',
        description: 'Path to the file to patch (relative to vault root)',
    },
    {
        displayName: 'Patch Operation',
        name: 'patchOperation',
        type: 'options',
        options: [
            {
                name: 'Append',
                value: 'append',
            },
            {
                name: 'Prepend',
                value: 'prepend',
            },
            {
                name: 'Replace',
                value: 'replace',
            },
        ],
        default: 'append',
        required: true,
        displayOptions: {
            show: showForOperation,
        },
    },
    {
        displayName: 'Target Type',
        name: 'targetType',
        type: 'options',
        options: [
            {
                name: 'Heading',
                value: 'heading',
            },
            {
                name: 'Block',
                value: 'block',
            },
            {
                name: 'Frontmatter',
                value: 'frontmatter',
            },
        ],
        default: 'heading',
        required: true,
        displayOptions: {
            show: showForOperation,
        },
        description: 'Type of target to patch',
    },
    {
        displayName: 'Target',
        name: 'target',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showForOperation,
        },
        placeholder: 'e.g., "## Tasks" or "^block-ID" or "tags"',
        description: 'Target identifier (heading path, block reference, or frontmatter field)',
    },
    {
        displayName: 'Content',
        name: 'content',
        type: 'string',
        default: '',
        required: true,
        typeOptions: {
            rows: 5,
        },
        displayOptions: {
            show: showForOperation,
        },
        description: 'Content to insert',
    },
];
//# sourceMappingURL=patch.js.map