"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const merge_1 = require("@graphql-tools/merge");
const load_files_1 = require("@graphql-tools/load-files");
const resolversArray = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './resolvers'));
const resolvers = (0, merge_1.mergeResolvers)(resolversArray);
exports.default = resolvers;
//# sourceMappingURL=get-resolvers.js.map