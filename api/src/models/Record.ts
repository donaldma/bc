import { IsDefined, IsString, IsNumber, IsBoolean } from 'class-validator'
import { validateWithThrow, isUpdateRequired } from './Validation'

export interface IRecordEntity {
  id: number
  item: string
  owner: string
  price: number
  isDeleted: boolean
  createDate: Date
}

export class RecordCreateRequest {
  @IsDefined()
  @IsString()
  item: string

  @IsDefined()
  @IsString()
  owner: string

  @IsDefined()
  @IsNumber()
  price: number

  constructor(json: any) {
    this.item = json.item
    this.owner = json.owner && json.owner.toLowerCase()
    this.price = json.price

    validateWithThrow(this)
  }
}

export class RecordUpdateRequest {
  @IsString()
  item: string

  @IsString()
  owner: string

  @IsNumber()
  price: number

  @IsBoolean()
  isDeleted: number

  constructor(json: any) {
    this.item = json.item
    this.owner = json.owner && json.owner.toLowerCase()
    this.price = json.price
    this.isDeleted = json.isDeleted

    validateWithThrow(this)
  }

  requiresUpdate() {
    return isUpdateRequired(this)
  }
}
