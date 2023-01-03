"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMiddleware = void 0;
const express_graphql_1 = require("express-graphql");
const get_schema_1 = require("./schema/get-schema");
// Probably delete
const root = {
    hello: () => {
        return 'Hello worldzy!';
    }
};
const getMiddleware = () => {
    return (0, express_graphql_1.graphqlHTTP)({
        schema: (0, get_schema_1.getSchema)(),
        rootValue: root,
        graphiql: true
    });
};
exports.getMiddleware = getMiddleware;
//# sourceMappingURL=setup.js.map