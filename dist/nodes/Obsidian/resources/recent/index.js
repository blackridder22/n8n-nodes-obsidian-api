"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentDescription = void 0;
const getRecentChanges_1 = require("./getRecentChanges");
const showForResource = {
    resource: ['recent'],
};
exports.recentDescription = [
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
                name: 'Get Recent Changes',
                value: 'getRecentChanges',
                action: 'Get recently modified files',
                description: 'Get recently modified files in the vault',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/search/',
                        headers: {
                            'Content-Type': 'application/vnd.olrapi.dataview.dql+txt',
                        },
                        body: '={{ `TABLE file.mtime\nWHERE file.mtime >= date(today) - dur(${$parameter.days} days)\nSORT file.mtime DESC\nLIMIT ${$parameter.limit}` }}',
                    },
                },
            },
        ],
        default: 'getRecentChanges',
    },
    ...getRecentChanges_1.recentGetRecentChangesDescription,
];
//# sourceMappingURL=index.js.map