"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentGetRecentChangesDescription = void 0;
const showForOperation = {
    operation: ['getRecentChanges'],
    resource: ['recent'],
};
exports.recentGetRecentChangesDescription = [
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
        default: 10,
        displayOptions: {
            show: showForOperation,
        },
        description: 'Maximum number of files to return',
    },
    {
        displayName: 'Days',
        name: 'days',
        type: 'number',
        typeOptions: {
            minValue: 1,
        },
        default: 90,
        displayOptions: {
            show: showForOperation,
        },
        description: 'Only include files modified within this many days',
    },
];
//# sourceMappingURL=getRecentChanges.js.map