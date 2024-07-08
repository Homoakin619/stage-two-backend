"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UserAuthenticationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true, escape: true }),
            password: Validator_1.schema.string({ trim: true, escape: true }),
        });
        this.messages = {
            "email.required": "Email field is required",
            "email.string": "Enter a valid email address",
            "password.required": "Password field is required",
            "password.string": "Password field should be alphanumeric"
        };
    }
}
exports.default = UserAuthenticationValidator;
//# sourceMappingURL=UserAuthenticationValidator.js.map