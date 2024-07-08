"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
exports.UserFactory = Factory_1.default.define(User_1.default, ({ faker }) => {
    return {
        userId: (0, Helpers_1.cuid)(),
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        email: faker.internet.userName(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
    };
}).build();
//# sourceMappingURL=UserFactory.js.map