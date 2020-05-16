'use strict';

import { response } from 'express';
const isProd = process.env.NODE_ENV === 'production';

response.api200 = function (data, message = 'success', properties) {
  const res = { statusCode: 200, message };
  if (data) res.data = data;
  if (data && data.length) res.total = data.length;
  this.status(200).send(res);
};

response.api400 = function (err = {}) {
  console.log(err);
  if (err instanceof Error) {
    const res = { statusCode: 400, message: err.message || 'Bad Request' };
    if (!isProd) res.stack = err.stack.split('\n');
    this.status(400).send(res);
  } else {
    this.status(500).send('Invalid Output Format');
  }
};

response.api404 = function (err = {}) {
  console.log(err);
  const res = { statusCode: 404, message: err.message || 'Not Found' };
  this.status(404).send(res);
};

response.api500 = function (err = {}) {
  console.log(err);
  if (err instanceof Error) {
    const res = { statusCode: 500, message: err.message || 'Internal Server Error' };
    if (!isProd) res.stack = err.stack.split('\n');
    this.status(500).send(res);
  } else {
    this.status(500).send('Invalid Output Format');
  }
};