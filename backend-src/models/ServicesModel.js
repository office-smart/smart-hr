'use strict'

import mongoose from 'mongoose'
import { Services } from '../interfaces/ModelInterfaces'
import staticControl from './statics/ExtendsStatics'

const schema = new mongoose.Schema(Services)
schema.statics = staticControl

const model = mongoose.model('Services', schema, 'Services')

export default model
