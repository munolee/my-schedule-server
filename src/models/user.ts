import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);

module.exports = () => {
  return client.db('schedule').collection('user').find().toArray();
};
