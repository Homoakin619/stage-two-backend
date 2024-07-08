import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserRegistrationValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string({trim: true, escape: true},[rules.unique({
      table: "users",
      column: "email"
  })]),
    firstName: schema.string({trim: true, escape: true}),
    lastName: schema.string({trim: true, escape: true}),
    password: schema.string({trim: true, escape: true}),
    phone: schema.string({trim: true, escape: true},[rules.minLength(8)]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "email.required": "Email field is required",
    "email.string": "Enter a valid email address",
    "firstName.required": "Firstname field is required",
    "firstName.string": "Enter a valid firstname",
    "lastName.required": "lastname field is required",
    "lastName.string": "Enter a valid lastname",
    "phone.required": "Phone field is required",
    "phone.string": "Enter a valid phone",
    "password.required": "Password field is required",
    "password.string": "Password field should be alphanumeric"
  }
}
