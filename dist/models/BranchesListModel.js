'use strict';

import mongoose from 'mongoose';
import { Permissions } from '../interfaces/ModelInterfaces';
import staticControl from './statics/ExtendsStatics';

const schema = new mongoose.Schema(Permissions);
schema.statics = staticControl;

const model = mongoose.model('BranchesList', schema, 'BranchesList');

export default model;