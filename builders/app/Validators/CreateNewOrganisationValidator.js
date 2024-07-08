"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateNewOrganisationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({ trim: true, escape: true }, [Validator_1.rules.unique({
                    table: "organisations",
                    column: "name"
                })]),
            description: Validator_1.schema.string.optional({ trim: true, escape: true }),
        });
        this.messages = {
            "name.unique": "Organisation name already exist, choose another name",
            "name.string": "Organisation name can only be a string"
        };
    }
}
exports.default = CreateNewOrganisationValidator;
//# sourceMappingURL=CreateNewOrganisationValidator.js.map