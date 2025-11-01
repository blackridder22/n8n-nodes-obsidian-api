"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaultDeleteDescription = void 0;
const showForOperation = {
    operation: ['delete'],
    resource: ['vault'],
};
exports.vaultDeleteDescription = [
    {
        displayName: 'File Path',
        name: 'filepath',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showForOperation,
        },
        placeholder: 'e.g., "Old Note.md"',
        description: 'Path to the file or directory to delete (relative to vault root)',
    },
];
//# sourceMappingURL=delete.js.map