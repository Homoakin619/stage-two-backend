import { beforeCreate, beforeSave, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from "@ioc:Adonis/Core/Hash"
import AbstractBaseModel from './AbstractBaseModel'
import { cuid } from "@ioc:Adonis/Core/Helpers"
import Organisation from './Organisation'

export default class User extends AbstractBaseModel {

  @column()
  public userId: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public password: string


  @beforeSave()
  public static async hashPassword(model: User) {
    model.password = await Hash.make(model.password)
  }

  @beforeCreate()
  public static async generateIdentifier(model: User) {
    model.userId = cuid()
  }

  @manyToMany(() => Organisation, {
    pivotTable: "organisation_users",
    localKey: "id",
    relatedKey: "id",
    pivotForeignKey: "user_id",
    pivotRelatedForeignKey: "org_id"

  })
  public organisations: ManyToMany<typeof Organisation>

  public forClient() {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone
    }
  }
}
