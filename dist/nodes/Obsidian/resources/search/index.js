"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDescription = void 0;
const simple_1 = require("./simple");
const complex_1 = require("./complex");
const showForResource = {
    resource: ['search'],
};
exports.searchDescription = [
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
                name: 'Simple Search',
                value: 'simple',
                action: 'Perform a simple text search',
                description: 'Search for documents matching a specified text query',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/search/simple/',
                        qs: {
                            query: '={{$parameter.query}}',
                            contextLength: '={{$parameter.contextLength}}',
                        },
                    },
                },
            },
            {
                name: 'Complex Search',
                value: 'complex',
                action: 'Perform a complex (DQL or JSONLogic) search',
                description: 'Search for documents using a Dataview or JsonLogic query',
                routing: {
                    request: {
                        method: 'POST',
                        url: '=/search/',
                        body: '={{$parameter.query}}',
                        headers: {
                            'Content-Type': '={{$parameter.queryType}}',
                        },
                    },
                },
            },
        ],
        default: 'simple',
    },
    ...simple_1.searchSimpleDescription,
    ...complex_1.searchComplexDescription,
];
//# sourceMappingURL=index.js.map