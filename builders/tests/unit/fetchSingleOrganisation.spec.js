"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const sinon_1 = __importDefault(require("sinon"));
const FetchSingleOrganisationController_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Controllers/Http/FetchSingleOrganisationController"));
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
runner_1.test.group('FetchSingleOrganisationController', (group) => {
    let sandbox;
    group.setup(async () => {
        sandbox = sinon_1.default.createSandbox();
    });
    group.teardown(async () => {
        sandbox.restore();
    });
    group.each.teardown = () => {
        sandbox.restore();
    };
    (0, runner_1.test)('should return 200 and organisation data if organisation is found', async ({ assert }) => {
        const controller = new FetchSingleOrganisationController_1.default();
        const fakeUser = { userId: '123e4567-e89b-12d3-a456-426614174000' };
        const orgId = '123e4567-e89b-12d3-a456-426614174001';
        const fakeOrganisations = [{ orgId: '123e4567-e89b-12d3-a456-426614174001', name: 'Test Org', description: "a random organisation" }];
        sandbox.stub(UserAction_1.UserActions, 'fetchUserOrganisations').resolves(fakeOrganisations);
        const request = {
            param: sandbox.stub().returns(orgId)
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const auth = {
            user: fakeUser
        };
        const ctx = { request, response, auth };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(200));
        assert.isTrue(response.send.calledWith({
            status: "success",
            message: "Organisation fetched successfully",
            data: fakeOrganisations[0]
        }));
        sandbox.restore();
    });
    (0, runner_1.test)('should return 404 if organisation is not found', async ({ assert }) => {
        const controller = new FetchSingleOrganisationController_1.default();
        const fakeUser = { userId: '123e4567-e89b-12d3-a456-426614174000' };
        const orgId = '123e4567-e89b-12d3-a456-426614174001';
        const fakeOrganisations = [{ orgId: '123e4567-e89b-12d3-a456-426614174002', name: 'Other Org', description: "nice description" }];
        sandbox.stub(UserAction_1.UserActions, 'fetchUserOrganisations').resolves(fakeOrganisations);
        const request = {
            param: sandbox.stub().returns(orgId)
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const auth = {
            user: fakeUser
        };
        const ctx = { request, response, auth };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(404));
        assert.isTrue(response.send.calledWith({
            status: "Bad Request",
            message: "Organisation record not found",
            data: undefined
        }));
        sandbox.restore();
    });
    (0, runner_1.test)('should return 500 if an error occurs', async ({ assert }) => {
        const controller = new FetchSingleOrganisationController_1.default();
        const fakeUser = { userId: '123e4567-e89b-12d3-a456-426614174000' };
        const orgId = '123e4567-e89b-12d3-a456-426614174001';
        sandbox.stub(UserAction_1.UserActions, 'fetchUserOrganisations').throws(new Error('Simulated error'));
        const request = {
            param: sandbox.stub().returns(orgId)
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const auth = {
            user: fakeUser
        };
        const ctx = { request, response, auth };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(500));
        assert.isTrue(response.send.calledWith({
            status: "Error",
            message: "Error Occured Fetching Organisation",
            statusCode: 500
        }));
        sandbox.restore();
    });
});
//# sourceMappingURL=fetchSingleOrganisation.spec.js.map