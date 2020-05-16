'use strict'

import mongoose from 'mongoose'
import { JobList } from '../interfaces/ModelInterfaces'
import staticControl from './statics/ExtendsStatics'

const schema = new mongoose.Schema(JobList)
schema.statics = staticControl

const model = mongoose.model('JobList', schema, 'JobList')

export default model
