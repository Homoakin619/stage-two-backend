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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVc2VyRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx5RkFBK0M7QUFDL0MsaUZBQWtDO0FBQ2xDLHVFQUErQztBQUVsQyxRQUFBLFdBQVcsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7SUFDNUQsT0FBTztRQUNMLE1BQU0sRUFBRSxJQUFBLGNBQUksR0FBRTtRQUNkLFNBQVMsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNwQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDbkMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2hDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7S0FDNUIsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGF0YWJhc2UvZmFjdG9yaWVzL1VzZXJGYWN0b3J5LnRzXG5pbXBvcnQgRmFjdG9yeSBmcm9tICdAaW9jOkFkb25pcy9MdWNpZC9GYWN0b3J5J1xuaW1wb3J0IFVzZXIgZnJvbSAnQXBwL01vZGVscy9Vc2VyJ1xuaW1wb3J0IHsgY3VpZCB9IGZyb20gXCJAaW9jOkFkb25pcy9Db3JlL0hlbHBlcnNcIlxuXG5leHBvcnQgY29uc3QgVXNlckZhY3RvcnkgPSBGYWN0b3J5LmRlZmluZShVc2VyLCAoeyBmYWtlciB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgdXNlcklkOiBjdWlkKCksXG4gICAgZmlyc3ROYW1lOiBmYWtlci5pbnRlcm5ldC51c2VyTmFtZSgpLFxuICAgIGxhc3ROYW1lOiBmYWtlci5pbnRlcm5ldC51c2VyTmFtZSgpLFxuICAgIGVtYWlsOiBmYWtlci5pbnRlcm5ldC51c2VyTmFtZSgpLFxuICAgIHBhc3N3b3JkOiBmYWtlci5pbnRlcm5ldC5wYXNzd29yZCgpLFxuICAgIHBob25lOiBmYWtlci5waG9uZS5udW1iZXIoKSxcbiAgfVxufSkuYnVpbGQoKVxuIl19