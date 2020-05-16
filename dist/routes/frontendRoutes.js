'use strict';

import express from 'express';
import controllers from '../controllers';
import requireAll from 'require-all';
import { join } from 'path';

const frontendRoutesV1 = requireAll(join(__dirname, '/v1/frontend'));

const router = express.Router();

function getController(name = '') {
  const splitter = name.split('.');
  let ctrl = null;
  for (const x of splitter) {
    if (!ctrl && controllers[x]) {
      ctrl = controllers[x];
    } else {
      if (ctrl[x]) {
        ctrl = ctrl[x];
      }
    }
  }
  return ctrl;
}

for (const routes in frontendRoutesV1) {
  const r = frontendRoutesV1[routes];
  for (const xRoute in r) {
    try {
      const { method, path, controller, beforeController, afterController } = r[xRoute];
      const ctrl = getController(controller);
      if (!ctrl) throw new Error(`Invalid Controller Named ${controller}`);
      console.log(`[frontend] registering route ${path}`);
      if (method === 'GET') {
        router.get(path, [...beforeController, async function (req, res, next) {
          try {
            await ctrl({ req, res }, next);
          } catch (err) {
            next(err);
          }
        }, ...afterController]);
      } else if (method === 'POST') {
        router.post(path, [...beforeController, async function (req, res, next) {
          try {
            await ctrl({ req, res }, next);
          } catch (err) {
            next(err);
          }
        }, ...afterController]);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default router;