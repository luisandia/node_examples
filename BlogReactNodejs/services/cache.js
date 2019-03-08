const mongoose = require('mongoose');
const redis = require('redis')
const util = require('util')
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  console.log('About to run a query');
  console.log(this.getQuery());
  console.log(this.mongooseCollection.name)

  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  }));
  console.log("key");
  console.log(key);

  const cacheValue = await client.get(key);
  if (cacheValue) {
    console.log("cache found");
    console.log(cacheValue);
    const doc = JSON.parse(cacheValue)
    return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);

    // return data
  }
  const result = await exec.apply(this, arguments);

  client.set(key, JSON.stringify(result));
  return result;
}