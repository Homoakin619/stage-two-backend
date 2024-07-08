import { beforeCreate, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { cuid } from "@ioc:Adonis/Core/Helpers"
import AbstractBaseModel from './AbstractBaseModel'
import User from './User'

export default class Organisation extends AbstractBaseModel {
  @column()
  public orgId: string

  @column()
  public name: string

  @column()
  public description: string

  @manyToMany(() => User, {
    pivotTable: "organisation_users",
    localKey: "id",
    relatedKey: "id",
    pivotForeignKey: "org_id",
    pivotRelatedForeignKey: "user_id"

  })
  public users: ManyToMany<typeof User>

  public forClient() {
    return {
      orgId: this.orgId,
      name: this.name,
      description: this.description || ""
    }
  }

  @beforeCreate()
  public static async generateIdentifier(model: Organisation) {
    model.orgId = cuid()
  }
}
