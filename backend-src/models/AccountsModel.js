'use strict'

import mongoose from 'mongoose'
import { Accounts } from '../interfaces/ModelInterfaces'
import staticControl from './statics/ExtendsStatics'

const schema = new mongoose.Schema(Accounts)
schema.statics = staticControl

const model = mongoose.model('Accounts', schema, 'Accounts')

export default model
