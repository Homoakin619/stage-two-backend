"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UserRegistrationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true, escape: true }, [Validator_1.rules.unique({
                    table: "users",
                    column: "email"
                })]),
            firstName: Validator_1.schema.string({ trim: true, escape: true }),
            lastName: Validator_1.schema.string({ trim: true, escape: true }),
            password: Validator_1.schema.string({ trim: true, escape: true }),
            phone: Validator_1.schema.string({ trim: true, escape: true }, [Validator_1.rules.minLength(8)]),
        });
        this.messages = {
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
        };
    }
}
exports.default = UserRegistrationValidator;
//# sourceMappingURL=UserRegistrationValidator.js.map