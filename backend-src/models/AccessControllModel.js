'use strict'

import mongoose from 'mongoose'
import { AccessControll } from '../interfaces/ModelInterfaces'
import staticControl from './statics/ExtendsStatics'

const schema = new mongoose.Schema(AccessControll)
schema.statics = staticControl

const model = mongoose.model('AccessControll', schema, 'AccessControll')

export default model
