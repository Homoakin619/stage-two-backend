"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return { hello: 'world' };
});
Route_1.default.post("auth/register", "UserRegistrationController");
Route_1.default.post("auth/login", "UserAuthenticationController");
Route_1.default.group(() => {
    Route_1.default.get("users/:id", "FetchSingleUserController");
    Route_1.default.get("organisations/:orgId", "FetchSingleOrganisationController");
    Route_1.default.get("organisations", "FetchAllUserOrganisationsController");
    Route_1.default.post("organisations", "CreateNewOrganisationController");
    Route_1.default.post("organisations/:orgId/users", "AddUserToOrganisationController");
})
    .prefix('api')
    .middleware('api');
//# sourceMappingURL=routes.js.map