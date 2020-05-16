'use strict';

import redis from 'redis';

const REDISURI = process.env.REDIS_URI;

let client = null;

export default {
  createRedisConnection: () => {
    return new Promise((resolve, reject) => {
      client = redis.createClient({
        url: REDISURI
      });

      client.on('error', err => {
        console.log(err);
        return reject(err);
      });

      client.on('connect', () => {
        console.log('( √ ) redis');
        return resolve();
      });

      client.on('reconnecting', () => {
        console.log('( redis ) reconnecting');
      });

      client.on('end', () => {
        console.log('( redis ) end connection');
        return reject();
      });
    });
  },
  set: ({ key, value, exp }) => {
    client.set(key, value, 'EX', exp);
  },
  get: key => {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },
  del: key => {
    client.del(key, function (err) {
      if (!err) {
        client.del(`permissions_${key}`, function (err2) {
          console.log(err2);
        });
      }
    });
  }
};