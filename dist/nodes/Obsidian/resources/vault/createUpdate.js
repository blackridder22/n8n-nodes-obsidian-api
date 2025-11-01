"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaultCreateUpdateDescription = void 0;
const showForOperation = {
    operation: ['createUpdate'],
    resource: ['vault'],
};
exports.vaultCreateUpdateDescription = [
    {
        displayName: 'File Path',
        name: 'filepath',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showForOperation,
        },
        placeholder: 'e.g., "New Note.md"',
        description: 'Path to the file to create or update (relative to vault root)',
    },
    {
        displayName: 'Content',
        name: 'content',
        type: 'string',
        default: '',
        required: true,
        typeOptions: {
            rows: 10,
        },
        displayOptions: {
            show: showForOperation,
        },
        description: 'Content to write to the file',
    },
];
//# sourceMappingURL=createUpdate.js.map