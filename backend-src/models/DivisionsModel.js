'use strict'

import mongoose from 'mongoose'
import { Divisions } from '../interfaces/ModelInterfaces'
import staticControl from './statics/ExtendsStatics'

const schema = new mongoose.Schema(Divisions)
schema.statics = staticControl

const model = mongoose.model('Divisions', schema, 'Divisions')

export default model
