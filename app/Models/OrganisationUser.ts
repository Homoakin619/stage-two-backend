import { column } from '@ioc:Adonis/Lucid/Orm'
import AbstractBaseModel from './AbstractBaseModel'

export default class OrganisationUser extends AbstractBaseModel {
  @column()
  public userId: number

  @column()
  public orgId: number
}
