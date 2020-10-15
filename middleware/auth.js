<<<<<<< HEAD
=======
const config = require('config')
>>>>>>> d7fd8e2f9d2354ab2becfe3d5034400d794d1eb0
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) res.status(401).json({ msg: 'No token, authorization denied' })

  try {
<<<<<<< HEAD
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
=======
    const decoded = jwt.verify(token, config.get('jwtSecret'))
>>>>>>> d7fd8e2f9d2354ab2becfe3d5034400d794d1eb0
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ msg: 'Token is not valid' })
  }
}
