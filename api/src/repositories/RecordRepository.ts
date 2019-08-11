import knex from '../config/knex'
import { RecordCreateRequest, IRecordEntity, RecordUpdateRequest } from '../models/Record'
import { NotFoundError } from '../models/Error'

const recordTable = 'record'

class RecordRepository {
  async create(request: RecordCreateRequest): Promise<number> {
    const [recordId] = await knex(recordTable)
      .insert(request)
      .returning('id')
    return recordId
  }

  async update(recordId: number, request: RecordUpdateRequest): Promise<void> {
    await knex(recordTable)
      .update(request)
      .where('id', recordId)
  }

  async getAll(): Promise<IRecordEntity[]> {
    return await knex(recordTable).where('isDeleted', false)
  }

  async getById(recordId: number): Promise<IRecordEntity> {
    const recordEntity: IRecordEntity = await knex(recordTable)
      .where('id', recordId)
      .first()
    if (!recordEntity) {
      throw new NotFoundError('record', 'Record not found')
    }
    return recordEntity
  }
}

const RecordRepositoryInstance = new RecordRepository()
export { RecordRepositoryInstance as RecordRepository }
