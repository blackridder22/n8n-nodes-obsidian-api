"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSimpleDescription = void 0;
const showForOperation = {
    operation: ['simple'],
    resource: ['search'],
};
exports.searchSimpleDescription = [
    {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showForOperation,
        },
        placeholder: 'Text to search for',
        description: 'Simple text to search for in the vault',
    },
    {
        displayName: 'Context Length',
        name: 'contextLength',
        type: 'number',
        default: 100,
        displayOptions: {
            show: showForOperation,
        },
        description: 'How much context to return around the matching string',
    },
];
//# sourceMappingURL=simple.js.map