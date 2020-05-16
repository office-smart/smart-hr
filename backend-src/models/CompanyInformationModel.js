'use strict'

import mongoose from 'mongoose'
import { CompanyInformation } from '../interfaces/ModelInterfaces'
import staticControl from './statics/ExtendsStatics'

const schema = new mongoose.Schema(CompanyInformation)
schema.statics = staticControl

const model = mongoose.model('CompanyInformations', schema, 'CompanyInformations')

export default model
