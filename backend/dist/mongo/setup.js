"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectMongo = exports.connectMongo = void 0;
const mongodb_1 = require("mongodb");
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
//"mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(uri);
const connectMongo = async () => {
    try {
        await client.connect();
        console.log('Connected to mongo');
        return client.db(`${process.env.DB_NAME}`);
    }
    catch (_a) {
        // ???
    }
};
exports.connectMongo = connectMongo;
const disconnectMongo = async () => {
    try {
        await client.close();
        console.log('Connected to mongo closed');
    }
    catch (_a) {
        // ???
    }
};
exports.disconnectMongo = disconnectMongo;
//# sourceMappingURL=setup.js.map