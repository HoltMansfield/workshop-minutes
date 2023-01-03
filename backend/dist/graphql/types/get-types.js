"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const typesArray = loadFilesSync(path.join(__dirname, './types'));
const types = mergeTypeDefs(typesArray);
exports.default = types;
//# sourceMappingURL=get-types.js.map