const security = require('../utils/security')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const token = (req, res, next) => {
  try {
    const token = getTokenFrom(req)
    console.log(token);
    req.token = token ? security.verify(token) : null
    next()
  } catch(ex) {
    console.log(ex);
    res.status(400).send({ error: 'invalid token' })
  }
}

const error = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

module.exports = {
  error, token
}
