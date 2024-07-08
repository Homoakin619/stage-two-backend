// Database/factories/OrganisationFactory.ts
import Factory from '@ioc:Adonis/Lucid/Factory'
import Organisation from 'App/Models/Organisation'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export const OrganisationFactory = Factory.define(Organisation, ({ faker }) => {
  return {
    orgId: cuid(),
    name: `${faker.company.name()} Organisation`,
    description: faker.company.catchPhrase(),
  }
}).build()
