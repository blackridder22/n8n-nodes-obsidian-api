"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodicGetRecentDescription = void 0;
const showForOperation = {
    operation: ['getRecent'],
    resource: ['periodic'],
};
const periodOptions = [
    { name: 'Daily', value: 'daily' },
    { name: 'Weekly', value: 'weekly' },
    { name: 'Monthly', value: 'monthly' },
    { name: 'Quarterly', value: 'quarterly' },
    { name: 'Yearly', value: 'yearly' },
];
exports.periodicGetRecentDescription = [
    {
        displayName: 'Period',
        name: 'period',
        type: 'options',
        options: periodOptions,
        default: 'daily',
        required: true,
        displayOptions: {
            show: showForOperation,
        },
        description: 'The period type',
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
            minValue: 1,
            maxValue: 50,
        },
        default: 5,
        displayOptions: {
            show: showForOperation,
        },
        description: 'Maximum number of notes to return',
    },
    {
        displayName: 'Include Content',
        name: 'includeContent',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: showForOperation,
        },
        description: 'Whether to include note content',
    },
];
//# sourceMappingURL=getRecent.js.map