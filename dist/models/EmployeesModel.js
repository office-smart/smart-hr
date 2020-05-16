'use strict';

import mongoose from 'mongoose';
import { Employees } from '../interfaces/ModelInterfaces';
import staticControl from './statics/ExtendsStatics';

const schema = new mongoose.Schema(Employees);
schema.statics = staticControl;

const model = mongoose.model('Employees', schema, 'Employees');

export default model;