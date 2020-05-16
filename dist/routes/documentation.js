'use strict';

import express from 'express';
import apiJSON from '../services/Swagger';
const router = express.Router();

router.get('/v1', function (req, res) {
  res.render('documentation/doc-v1', { jsonApiSchema: '/documentation/v1/api.json' });
});
router.get('/v1/api.json', function (req, res) {
  res.json(apiJSON);
});

export default router;