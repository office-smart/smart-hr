'use strict'

import mongoose from 'mongoose'
import { Clients } from '../interfaces/ModelInterfaces'
import staticControl from './statics/ExtendsStatics'

const schema = new mongoose.Schema(Clients)
schema.statics = staticControl

const model = mongoose.model('Clients', schema, 'Clients')

export default model
