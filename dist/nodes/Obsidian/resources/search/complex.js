"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchComplexDescription = void 0;
const showForOperation = {
    operation: ['complex'],
    resource: ['search'],
};
exports.searchComplexDescription = [
    {
        displayName: 'Query Type',
        name: 'queryType',
        type: 'options',
        options: [
            {
                name: 'Dataview DQL',
                value: 'application/vnd.olrapi.dataview.dql+txt',
            },
            {
                name: 'JSONLogic',
                value: 'application/vnd.olrapi.jsonlogic+json',
            },
        ],
        default: 'application/vnd.olrapi.dataview.dql+txt',
        displayOptions: {
            show: showForOperation,
        },
        description: 'The type of complex query to perform',
    },
    {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                ...showForOperation,
                queryType: ['application/vnd.olrapi.dataview.dql+txt'],
            },
        },
        typeOptions: {
            rows: 10,
        },
        placeholder: 'TABLE file.mtime FROM #task SORT file.mtime DESC',
        description: 'The DQL query to execute',
    },
    {
        displayName: 'Query',
        name: 'query',
        type: 'json',
        default: '',
        required: true,
        displayOptions: {
            show: {
                ...showForOperation,
                queryType: ['application/vnd.olrapi.jsonlogic+json'],
            },
        },
        typeOptions: {
            rows: 10,
        },
        placeholder: '{\n  "glob": ["*.md", {"var": "path"}]\n}',
        description: 'The JSONLogic query to execute',
    },
];
//# sourceMappingURL=complex.js.map