import { RecordCreateRequest, IRecordEntity, RecordUpdateRequest } from '../models/Record'
import { RecordRepository } from '../repositories/RecordRepository'
import _ from 'lodash'

class RecordService {
  async create(request: RecordCreateRequest): Promise<IRecordEntity> {
    const recordId = await RecordRepository.create(request)
    return await this.getById(recordId)
  }

  async update(request: RecordUpdateRequest, recordId: number): Promise<IRecordEntity> {
    if (request.requiresUpdate()) {
      await RecordRepository.update(recordId, request)
    }

    return await this.getById(recordId)
  }

  async getAll(): Promise<IRecordEntity[]> {
    const response = await RecordRepository.getAll()
    return _.sortBy(response, 'createDate').reverse()
  }

  async getById(recordId: number): Promise<IRecordEntity> {
    return await RecordRepository.getById(recordId)
  }
}

const RecordServiceInstance = new RecordService()
export { RecordServiceInstance as RecordService }
