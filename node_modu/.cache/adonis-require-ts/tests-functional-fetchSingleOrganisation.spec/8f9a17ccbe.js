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
        response.assertStatus(200);
        assert.equal(response.body().status, 'success');
        assert.equal(response.body().message, 'Organisation fetched successfully');
        assert.equal(response.body().data.orgId, orgId);
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hTaW5nbGVPcmdhbmlzYXRpb24uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZldGNoU2luZ2xlT3JnYW5pc2F0aW9uLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBbUM7QUFDbkMsMkZBQWlEO0FBQ2pELHNGQUE0RDtBQUU1RCw2RkFBb0U7QUFDcEUsc0dBQTRFO0FBSTVFLGFBQUksQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUN4RCxJQUFJLElBQVUsQ0FBQTtJQUNkLElBQUksS0FBYSxDQUFBO0lBRWpCLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxrQkFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUE7UUFFdkMsSUFBSSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNqQyxNQUFNLFlBQVksR0FBRyxNQUFNLHlDQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3ZELEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFBO1FBRTFCLE1BQU0sd0NBQW1CLENBQUMscUJBQXFCLENBQUM7WUFDOUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNoQixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDeEIsTUFBTSxrQkFBUSxDQUFDLHlCQUF5QixFQUFFLENBQUE7SUFDNUMsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGFBQUksRUFBQyxrRUFBa0UsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNwRyxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU07YUFDMUIsR0FBRyxDQUFDLHNCQUFzQixLQUFLLEVBQUUsQ0FBQzthQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ2IsSUFBSSxFQUFFLENBQUE7UUFHVCxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUMvQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQTtRQUMxRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ2pELENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsZ0RBQWdELEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDbEYsTUFBTSxTQUFTLEdBQUcsc0NBQXNDLENBQUE7UUFDeEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNO2FBQzFCLEdBQUcsQ0FBQyxzQkFBc0IsU0FBUyxFQUFFLENBQUM7YUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNiLElBQUksRUFBRSxDQUFBO1FBRVQsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDbkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLCtCQUErQixDQUFDLENBQUE7UUFDdEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUMsQ0FBQyxDQUFDLENBQUE7QUFFSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgfSBmcm9tICdAamFwYS9ydW5uZXInXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvRGF0YWJhc2UnXG5pbXBvcnQgeyBVc2VyRmFjdG9yeSB9IGZyb20gJ0RhdGFiYXNlL2ZhY3Rvcmllcy9Vc2VyRmFjdG9yeSdcbmltcG9ydCBVc2VyIGZyb20gJ0FwcC9Nb2RlbHMvVXNlcidcbmltcG9ydCB7IE9yZ2FuaXNhdGlvbkFjdGlvbnMgfSBmcm9tICdBcHAvQWN0aW9ucy9PcmdhbmlzYXRpb25BY3Rpb24nXG5pbXBvcnQgeyBPcmdhbmlzYXRpb25GYWN0b3J5IH0gZnJvbSAnRGF0YWJhc2UvZmFjdG9yaWVzL09yZ2FuaXNhdGlvbkZhY3RvcnknXG5pbXBvcnQgeyBVc2VyQWN0aW9ucyB9IGZyb20gJ0FwcC9BY3Rpb25zL1VzZXJBY3Rpb24nXG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nXG5cbnRlc3QuZ3JvdXAoJ0ZldGNoU2luZ2xlT3JnYW5pc2F0aW9uQ29udHJvbGxlcicsIChncm91cCkgPT4ge1xuICBsZXQgdXNlcjogVXNlclxuICBsZXQgb3JnSWQ6IHN0cmluZ1xuXG4gIGdyb3VwLnNldHVwKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5iZWdpbkdsb2JhbFRyYW5zYWN0aW9uKClcblxuICAgIHVzZXIgPSBhd2FpdCBVc2VyRmFjdG9yeS5jcmVhdGUoKVxuICAgIGNvbnN0IG9yZ2FuaXNhdGlvbiA9IGF3YWl0IE9yZ2FuaXNhdGlvbkZhY3RvcnkuY3JlYXRlKClcbiAgICBvcmdJZCA9IG9yZ2FuaXNhdGlvbi5vcmdJZFxuXG4gICAgYXdhaXQgT3JnYW5pc2F0aW9uQWN0aW9ucy5hZGRVc2VyVG9PcmdhbmlzYXRpb24oe1xuICAgICAgb3JnSWQ6IG9yZ2FuaXNhdGlvbi5pZCxcbiAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICB9KVxuICB9KVxuXG4gIGdyb3VwLnRlYXJkb3duKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5yb2xsYmFja0dsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMCBhbmQgb3JnYW5pc2F0aW9uIGRhdGEgaWYgb3JnYW5pc2F0aW9uIGlzIGZvdW5kJywgYXN5bmMgKHsgY2xpZW50LCBhc3NlcnQgfSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50XG4gICAgICAuZ2V0KGAvYXBpL29yZ2FuaXNhdGlvbnMvJHtvcmdJZH1gKVxuICAgICAgLmxvZ2luQXModXNlcilcbiAgICAgIC5zZW5kKClcblxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKDIwMClcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLnN0YXR1cywgJ3N1Y2Nlc3MnKVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkubWVzc2FnZSwgJ09yZ2FuaXNhdGlvbiBmZXRjaGVkIHN1Y2Nlc3NmdWxseScpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5kYXRhLm9yZ0lkLCBvcmdJZClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQwNCBpZiBvcmdhbmlzYXRpb24gaXMgbm90IGZvdW5kJywgYXN5bmMgKHsgY2xpZW50LCBhc3NlcnQgfSkgPT4ge1xuICAgIGNvbnN0IGZha2VPcmdJZCA9ICcxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDInXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnRcbiAgICAgIC5nZXQoYC9hcGkvb3JnYW5pc2F0aW9ucy8ke2Zha2VPcmdJZH1gKVxuICAgICAgLmxvZ2luQXModXNlcilcbiAgICAgIC5zZW5kKClcblxuICAgIHJlc3BvbnNlLmFzc2VydFN0YXR1cyg0MDQpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5zdGF0dXMsICdCYWQgUmVxdWVzdCcpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5tZXNzYWdlLCAnT3JnYW5pc2F0aW9uIHJlY29yZCBub3QgZm91bmQnKVxuICAgIGFzc2VydC5pc1VuZGVmaW5lZChyZXNwb25zZS5ib2R5KCkuZGF0YSlcbiAgfSlcblxufSlcbiJdfQ==