import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and password required' })
  }
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(401).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and password required' })
  }

  //TODO=> Check user must real
  const user = await User.findOne({ email: req.body.email }).exec()
  if (!user) {
    return res.status(401).send({ message: 'Not auth' })
  }

  //TODO=> Check password must match
  try {
    const match = await user.checkPassword(req.body.password)
    if (!match) {
      return res.status(401).send({ message: 'Not auth' })
    }

    //TODO==> Create new token
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(401).send({ message: 'Not auth' })
  }
}

export const protect = async (req, res, next) => {
  //TODO=== Looks for Bearer token in headers
  if (!req.headers.authorization) {
    return res.status(401).end()
  }
  let token = req.headers.authorization.split('Bearer ')[1]

  if (!token) {
    return res.status(401).end()
  }

  try {
    const payload = await verifyToken(token)
    const user = await User.findById(payload.id)
      .select('-password')
      .lean() //! == convert to JSON, now it's a Mongoose document
      .exec()
    req.user = user
    next() //! == Do as middleware
  } catch (e) {
    console.error(e)
    return res.status(401).end()
  }
}
