'use strict'

const { get } = require('../libs/redis')

module.exports = async (req, res, next) => {
  try {
    const xheader = req.header('x-auth-token')
    if (!xheader || (xheader && xheader.length === 0)) throw new Error('Invalid Auth Header')
    let user = await get(xheader)
    if (!user || (user && user.length === 0)) throw new Error('Invalid Session Data')
    user = JSON.parse(user)
    req.config = { user }
    next()
  } catch (err) {
    console.log(err)
    res.status(402).send({
      statusCode: 402,
      statusText: 'UnAuthorized',
      message: 'This Route Need The Token'
    })
  }
}
