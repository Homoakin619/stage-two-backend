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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JnYW5pc2F0aW9uRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9yZ2FuaXNhdGlvbkZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseUZBQStDO0FBQy9DLGlHQUFrRDtBQUNsRCx1RUFBK0M7QUFFbEMsUUFBQSxtQkFBbUIsR0FBRyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBWSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO0lBQzVFLE9BQU87UUFDTCxLQUFLLEVBQUUsSUFBQSxjQUFJLEdBQUU7UUFDYixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxlQUFlO1FBQzVDLFdBQVcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtLQUN6QyxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEYXRhYmFzZS9mYWN0b3JpZXMvT3JnYW5pc2F0aW9uRmFjdG9yeS50c1xuaW1wb3J0IEZhY3RvcnkgZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvRmFjdG9yeSdcbmltcG9ydCBPcmdhbmlzYXRpb24gZnJvbSAnQXBwL01vZGVscy9PcmdhbmlzYXRpb24nXG5pbXBvcnQgeyBjdWlkIH0gZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9IZWxwZXJzJ1xuXG5leHBvcnQgY29uc3QgT3JnYW5pc2F0aW9uRmFjdG9yeSA9IEZhY3RvcnkuZGVmaW5lKE9yZ2FuaXNhdGlvbiwgKHsgZmFrZXIgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIG9yZ0lkOiBjdWlkKCksXG4gICAgbmFtZTogYCR7ZmFrZXIuY29tcGFueS5uYW1lKCl9IE9yZ2FuaXNhdGlvbmAsXG4gICAgZGVzY3JpcHRpb246IGZha2VyLmNvbXBhbnkuY2F0Y2hQaHJhc2UoKSxcbiAgfVxufSkuYnVpbGQoKVxuIl19