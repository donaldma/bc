import { Router } from 'express'
import UserController from './User/UserController'
import RecordController from './RecordController'

const router = Router()
export default router

/**
 * Primary app routes.
 */
router.use('/users', UserController)
router.use('/records', RecordController)

router.get('/ping', (req, res) => {
  res.send({
    hello: 'world'
  })
})
