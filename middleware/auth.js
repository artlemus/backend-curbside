const config = require('config')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) res.status(401).json({ msg: 'No token, authorization denied' })

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ msg: 'Token is not valid' })
  }
}
