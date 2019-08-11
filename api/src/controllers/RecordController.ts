import { Router } from 'express'
import { RecordCreateRequest, RecordUpdateRequest } from '../models/Record'
import { RecordService } from '../services/RecordService'
import { isNumber } from '../models/Validation'
import { ArgumentError } from '../models/Error'

const router = Router()
export default router

router.post('/', async (req, res, next) => {
  try {
    const request = new RecordCreateRequest(req.body)
    const response = await RecordService.create(request)
    res.send(response)
  } catch (error) {
    next(error)
  }
})

router.patch('/:recordId', async (req, res, next) => {
  try {
    const recordId = parseInt(req.params.recordId)
    if (!isNumber(recordId)) {
      throw new ArgumentError('recordId', 'recordId must be a number')
    }
    const request = new RecordUpdateRequest(req.body)
    const response = await RecordService.update(request, recordId)
    res.send(response)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const response = await RecordService.getAll()
    res.send(response)
  } catch (error) {
    next(error)
  }
})
