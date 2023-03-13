"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient(process.env.MONGO_URI);
module.exports = () => {
    return client.db('schedule').collection('user').find().toArray();
};
//# sourceMappingURL=user.js.map