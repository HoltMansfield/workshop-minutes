"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = void 0;
const { mergeSchemas } = require('@graphql-tools/schema');
const get_resolvers_1 = __importDefault(require("../resolver/get-resolvers"));
const get_types_1 = __importDefault(require("../types/get-types"));
const getSchema = () => {
    const mergedSchema = mergeSchemas({
        // schemas: [schema],
        typeDefs: get_types_1.default,
        resolvers: get_resolvers_1.default
    });
    return mergedSchema;
};
exports.getSchema = getSchema;
//# sourceMappingURL=get-schema.js.map