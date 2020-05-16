// deps
import bcrypt from 'bcrypt'
// constants
import { SALT_ROUND } from '../config/app'

const service = {}

service.generate = async function (plainText) {
  const hash = await bcrypt.hash(plainText, SALT_ROUND)
  return hash
}

service.compare = async function (plainText, encryptedText) {
  const isValid = await bcrypt.compare(plainText, encryptedText)
  return isValid
}

export default service
