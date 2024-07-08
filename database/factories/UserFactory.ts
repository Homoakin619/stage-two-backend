// Database/factories/UserFactory.ts
import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import { cuid } from "@ioc:Adonis/Core/Helpers"

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    userId: cuid(),
    firstName: faker.internet.userName(),
    lastName: faker.internet.userName(),
    email: faker.internet.userName(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
  }
}).build()
