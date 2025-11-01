"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaultListDescription = void 0;
const showForOperation = {
    operation: ['list'],
    resource: ['vault'],
};
exports.vaultListDescription = [
    {
        displayName: 'Directory Path',
        name: 'dirpath',
        type: 'string',
        default: '',
        displayOptions: {
            show: showForOperation,
        },
        placeholder: 'e.g., "CRM/Contacts/"',
        description: 'Path to list files from (relative to vault root). Leave empty for vault root.',
    },
];
//# sourceMappingURL=list.js.map