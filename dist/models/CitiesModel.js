'use strict';

import mongoose from 'mongoose';
import { Cities } from '../interfaces/ModelInterfaces';
import staticControl from './statics/ExtendsStatics';

const schema = new mongoose.Schema(Cities);
schema.statics = staticControl;

const model = mongoose.model('Cities', schema, 'Cities');

export default model;