"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class AddUserToOrganisationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            userId: Validator_1.schema.string({ trim: true, escape: true }),
        });
        this.messages = {
            "userId.string": "userId should be a string",
            "userId.required": "userId field is required"
        };
    }
}
exports.default = AddUserToOrganisationValidator;
//# sourceMappingURL=AddUserToOrganisationValidator.js.map