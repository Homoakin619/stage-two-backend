"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganisationFactory = void 0;
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
const Organisation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Organisation"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
exports.OrganisationFactory = Factory_1.default.define(Organisation_1.default, ({ faker }) => {
    return {
        orgId: (0, Helpers_1.cuid)(),
        name: `${faker.company.name()} Organisation`,
        description: faker.company.catchPhrase(),
    };
}).build();
//# sourceMappingURL=OrganisationFactory.js.map