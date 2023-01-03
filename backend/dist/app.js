"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_1 = require("./mongo/setup");
const setup_2 = require("./graphql/setup");
const run = async () => {
    await (0, setup_1.connectMongo)();
    const app = (0, express_1.default)();
    // add GraphQL endpoint
    app.use('/graphql', (0, setup_2.getMiddleware)());
    app.listen(4000);
    console.log('Running a GraphQL API server at http://localhost:4000/graphql');
};
run();
//# sourceMappingURL=app.js.map