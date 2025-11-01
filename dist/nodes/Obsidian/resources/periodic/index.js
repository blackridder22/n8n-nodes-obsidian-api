"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodicDescription = void 0;
const get_1 = require("./get");
const getRecent_1 = require("./getRecent");
const showForResource = {
    resource: ['periodic'],
};
exports.periodicDescription = [
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
                name: 'Get Note',
                value: 'get',
                action: 'Get a periodic note',
                description: 'Get current periodic note for the specified period',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/periodic/{{$parameter.period}}/',
                        headers: {
                            Accept: '={{$parameter.format === "json" ? "application/vnd.olrapi.note+json" : "text/markdown"}}',
                        },
                    },
                },
            },
            {
                name: 'Get Recent Notes',
                value: 'getRecent',
                action: 'Get recent periodic notes',
                description: 'Get most recent periodic notes for the specified period type',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/periodic/{{$parameter.period}}/recent',
                        qs: {
                            limit: '={{$parameter.limit}}',
                            includeContent: '={{$parameter.includeContent}}',
                        },
                    },
                },
            },
        ],
        default: 'get',
    },
    ...get_1.periodicGetDescription,
    ...getRecent_1.periodicGetRecentDescription,
];
//# sourceMappingURL=index.js.map