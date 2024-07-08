"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const UserFactory_1 = global[Symbol.for('ioc.use')]("Database/factories/UserFactory");
const OrganisationAction_1 = global[Symbol.for('ioc.use')]("App/Actions/OrganisationAction");
const OrganisationFactory_1 = global[Symbol.for('ioc.use')]("Database/factories/OrganisationFactory");
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const sinon_1 = __importDefault(require("sinon"));
runner_1.test.group('FetchSingleOrganisationController', (group) => {
    let user;
    let orgId;
    group.setup(async () => {
        await Database_1.default.beginGlobalTransaction();
        user = await UserFactory_1.UserFactory.create();
        const organisation = await OrganisationFactory_1.OrganisationFactory.create();
        orgId = organisation.orgId;
        await OrganisationAction_1.OrganisationActions.addUserToOrganisation({
            orgId: organisation.id,
            userId: user.id,
        });
    });
    group.teardown(async () => {
        await Database_1.default.rollbackGlobalTransaction();
    });
    (0, runner_1.test)('should return 200 and organisation data if organisation is found', async ({ client, assert }) => {
        const response = await client
            .get(`/api/organisations/${orgId}`)
            .loginAs(user)
            .send();
        console.log(orgId);
        response.assertStatus(200);
        assert.equal(response.body().status, 'success');
        assert.equal(response.body().message, 'Organisation fetched successfully');
        assert.equal(response.body().data.id, orgId);
    });
    (0, runner_1.test)('should return 404 if organisation is not found', async ({ client, assert }) => {
        const fakeOrgId = '123e4567-e89b-12d3-a456-426614174002';
        const response = await client
            .get(`/api/organisations/${fakeOrgId}`)
            .loginAs(user)
            .send();
        response.assertStatus(404);
        assert.equal(response.body().status, 'Bad Request');
        assert.equal(response.body().message, 'Organisation record not found');
        assert.isUndefined(response.body().data);
    });
    (0, runner_1.test)('should return 500 if an error occurs', async ({ client, assert }) => {
        const stub = sinon_1.default.stub(UserAction_1.UserActions, 'fetchUserOrganisations').throws(new Error('Simulated error'));
        const response = await client
            .get(`/api/organisations/${orgId}`)
            .loginAs(user)
            .send();
        response.assertStatus(500);
        assert.equal(response.body().status, 'Error');
        assert.equal(response.body().message, 'Error Occured Fetching Organisation');
        assert.equal(response.body().statusCode, 500);
        stub.restore();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hTaW5nbGVPcmdhbmlzYXRpb24uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZldGNoU2luZ2xlT3JnYW5pc2F0aW9uLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBbUM7QUFDbkMsMkZBQWlEO0FBQ2pELHNGQUE0RDtBQUU1RCw2RkFBb0U7QUFDcEUsc0dBQTRFO0FBQzVFLDZFQUFvRDtBQUNwRCxrREFBeUI7QUFFekIsYUFBSSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3hELElBQUksSUFBVSxDQUFBO0lBQ2QsSUFBSSxLQUFhLENBQUE7SUFFakIsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNyQixNQUFNLGtCQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtRQUV2QyxJQUFJLEdBQUcsTUFBTSx5QkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLE1BQU0seUNBQW1CLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDdkQsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUE7UUFHMUIsTUFBTSx3Q0FBbUIsQ0FBQyxxQkFBcUIsQ0FBQztZQUM5QyxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUU7WUFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2hCLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLGtFQUFrRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3BHLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTTthQUMxQixHQUFHLENBQUMsc0JBQXNCLEtBQUssRUFBRSxDQUFDO2FBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDYixJQUFJLEVBQUUsQ0FBQTtRQUVQLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFcEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLG1DQUFtQyxDQUFDLENBQUE7UUFDMUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUM5QyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLGdEQUFnRCxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ2xGLE1BQU0sU0FBUyxHQUFHLHNDQUFzQyxDQUFBO1FBQ3hELE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTTthQUMxQixHQUFHLENBQUMsc0JBQXNCLFNBQVMsRUFBRSxDQUFDO2FBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDYixJQUFJLEVBQUUsQ0FBQTtRQUVULFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSwrQkFBK0IsQ0FBQyxDQUFBO1FBQ3RFLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsc0NBQXNDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFFeEUsTUFBTSxJQUFJLEdBQUcsZUFBSyxDQUFDLElBQUksQ0FBQyx3QkFBVyxFQUFFLHdCQUF3QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtRQUVuRyxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU07YUFDMUIsR0FBRyxDQUFDLHNCQUFzQixLQUFLLEVBQUUsQ0FBQzthQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ2IsSUFBSSxFQUFFLENBQUE7UUFFVCxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUscUNBQXFDLENBQUMsQ0FBQTtRQUM1RSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFFN0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IH0gZnJvbSAnQGphcGEvcnVubmVyJ1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJ0Bpb2M6QWRvbmlzL0x1Y2lkL0RhdGFiYXNlJ1xuaW1wb3J0IHsgVXNlckZhY3RvcnkgfSBmcm9tICdEYXRhYmFzZS9mYWN0b3JpZXMvVXNlckZhY3RvcnknXG5pbXBvcnQgVXNlciBmcm9tICdBcHAvTW9kZWxzL1VzZXInXG5pbXBvcnQgeyBPcmdhbmlzYXRpb25BY3Rpb25zIH0gZnJvbSAnQXBwL0FjdGlvbnMvT3JnYW5pc2F0aW9uQWN0aW9uJ1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uRmFjdG9yeSB9IGZyb20gJ0RhdGFiYXNlL2ZhY3Rvcmllcy9PcmdhbmlzYXRpb25GYWN0b3J5J1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICdBcHAvQWN0aW9ucy9Vc2VyQWN0aW9uJ1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJ1xuXG50ZXN0Lmdyb3VwKCdGZXRjaFNpbmdsZU9yZ2FuaXNhdGlvbkNvbnRyb2xsZXInLCAoZ3JvdXApID0+IHtcbiAgbGV0IHVzZXI6IFVzZXJcbiAgbGV0IG9yZ0lkOiBzdHJpbmdcblxuICBncm91cC5zZXR1cChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2UuYmVnaW5HbG9iYWxUcmFuc2FjdGlvbigpXG5cbiAgICB1c2VyID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKClcbiAgICBjb25zdCBvcmdhbmlzYXRpb24gPSBhd2FpdCBPcmdhbmlzYXRpb25GYWN0b3J5LmNyZWF0ZSgpXG4gICAgb3JnSWQgPSBvcmdhbmlzYXRpb24ub3JnSWRcblxuICAgIFxuICAgIGF3YWl0IE9yZ2FuaXNhdGlvbkFjdGlvbnMuYWRkVXNlclRvT3JnYW5pc2F0aW9uKHtcbiAgICAgIG9yZ0lkOiBvcmdhbmlzYXRpb24uaWQsXG4gICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgfSlcbiAgfSlcblxuICBncm91cC50ZWFyZG93bihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2Uucm9sbGJhY2tHbG9iYWxUcmFuc2FjdGlvbigpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiAyMDAgYW5kIG9yZ2FuaXNhdGlvbiBkYXRhIGlmIG9yZ2FuaXNhdGlvbiBpcyBmb3VuZCcsIGFzeW5jICh7IGNsaWVudCwgYXNzZXJ0IH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudFxuICAgICAgLmdldChgL2FwaS9vcmdhbmlzYXRpb25zLyR7b3JnSWR9YClcbiAgICAgIC5sb2dpbkFzKHVzZXIpXG4gICAgICAuc2VuZCgpXG5cbiAgICAgIGNvbnNvbGUubG9nKG9yZ0lkKVxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKDIwMClcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLnN0YXR1cywgJ3N1Y2Nlc3MnKVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkubWVzc2FnZSwgJ09yZ2FuaXNhdGlvbiBmZXRjaGVkIHN1Y2Nlc3NmdWxseScpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5kYXRhLmlkLCBvcmdJZClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQwNCBpZiBvcmdhbmlzYXRpb24gaXMgbm90IGZvdW5kJywgYXN5bmMgKHsgY2xpZW50LCBhc3NlcnQgfSkgPT4ge1xuICAgIGNvbnN0IGZha2VPcmdJZCA9ICcxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDInXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnRcbiAgICAgIC5nZXQoYC9hcGkvb3JnYW5pc2F0aW9ucy8ke2Zha2VPcmdJZH1gKVxuICAgICAgLmxvZ2luQXModXNlcilcbiAgICAgIC5zZW5kKClcblxuICAgIHJlc3BvbnNlLmFzc2VydFN0YXR1cyg0MDQpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5zdGF0dXMsICdCYWQgUmVxdWVzdCcpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5tZXNzYWdlLCAnT3JnYW5pc2F0aW9uIHJlY29yZCBub3QgZm91bmQnKVxuICAgIGFzc2VydC5pc1VuZGVmaW5lZChyZXNwb25zZS5ib2R5KCkuZGF0YSlcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDUwMCBpZiBhbiBlcnJvciBvY2N1cnMnLCBhc3luYyAoeyBjbGllbnQsIGFzc2VydCB9KSA9PiB7XG4gICAgLy8gU2ltdWxhdGUgYW4gZXJyb3IgYnkgc3R1YmJpbmcgdGhlIGZldGNoVXNlck9yZ2FuaXNhdGlvbnMgbWV0aG9kXG4gICAgY29uc3Qgc3R1YiA9IHNpbm9uLnN0dWIoVXNlckFjdGlvbnMsICdmZXRjaFVzZXJPcmdhbmlzYXRpb25zJykudGhyb3dzKG5ldyBFcnJvcignU2ltdWxhdGVkIGVycm9yJykpXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudFxuICAgICAgLmdldChgL2FwaS9vcmdhbmlzYXRpb25zLyR7b3JnSWR9YClcbiAgICAgIC5sb2dpbkFzKHVzZXIpXG4gICAgICAuc2VuZCgpXG5cbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoNTAwKVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkuc3RhdHVzLCAnRXJyb3InKVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkubWVzc2FnZSwgJ0Vycm9yIE9jY3VyZWQgRmV0Y2hpbmcgT3JnYW5pc2F0aW9uJylcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLnN0YXR1c0NvZGUsIDUwMClcblxuICAgIHN0dWIucmVzdG9yZSgpXG4gIH0pXG59KVxuIl19