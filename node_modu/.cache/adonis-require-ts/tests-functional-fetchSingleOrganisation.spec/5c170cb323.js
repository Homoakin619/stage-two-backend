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
    let user2;
    let orgId;
    let secondOrgId;
    group.setup(async () => {
        await Database_1.default.beginGlobalTransaction();
        user = await UserFactory_1.UserFactory.create();
        user2 = await UserFactory_1.UserFactory.create();
        const organisation = await OrganisationFactory_1.OrganisationFactory.create();
        orgId = organisation.orgId;
        const organisation2 = await OrganisationFactory_1.OrganisationFactory.create();
        secondOrgId = organisation2.orgId;
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
    (0, runner_1.test)('should return 404 if user not in organisation', async ({ client, assert }) => {
        const response = await client
            .get(`/api/organisations/${secondOrgId}`)
            .loginAs(user)
            .send();
        response.assertStatus(404);
        assert.equal(response.body().status, 'Bad Request');
        assert.equal(response.body().message, 'Organisation record not found');
        assert.isUndefined(response.body().data);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hTaW5nbGVPcmdhbmlzYXRpb24uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZldGNoU2luZ2xlT3JnYW5pc2F0aW9uLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBbUM7QUFDbkMsMkZBQWlEO0FBQ2pELHNGQUE0RDtBQUU1RCw2RkFBb0U7QUFDcEUsc0dBQTRFO0FBRTVFLGFBQUksQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUN4RCxJQUFJLElBQVUsQ0FBQTtJQUNkLElBQUksS0FBVyxDQUFBO0lBQ2YsSUFBSSxLQUFhLENBQUE7SUFDakIsSUFBSSxXQUFtQixDQUFBO0lBRXZCLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxrQkFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUE7UUFFdkMsSUFBSSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNqQyxLQUFLLEdBQUcsTUFBTSx5QkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBRWxDLE1BQU0sWUFBWSxHQUFHLE1BQU0seUNBQW1CLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDdkQsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUE7UUFFMUIsTUFBTSxhQUFhLEdBQUcsTUFBTSx5Q0FBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUN4RCxXQUFXLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQTtRQUVqQyxNQUFNLHdDQUFtQixDQUFDLHFCQUFxQixDQUFDO1lBQzlDLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBRTtZQUN0QixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDaEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3hCLE1BQU0sa0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsa0VBQWtFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDcEcsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNO2FBQzFCLEdBQUcsQ0FBQyxzQkFBc0IsS0FBSyxFQUFFLENBQUM7YUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNiLElBQUksRUFBRSxDQUFBO1FBR1QsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLG1DQUFtQyxDQUFDLENBQUE7UUFDMUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNqRCxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLGdEQUFnRCxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ2xGLE1BQU0sU0FBUyxHQUFHLHNDQUFzQyxDQUFBO1FBQ3hELE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTTthQUMxQixHQUFHLENBQUMsc0JBQXNCLFNBQVMsRUFBRSxDQUFDO2FBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDYixJQUFJLEVBQUUsQ0FBQTtRQUVULFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSwrQkFBK0IsQ0FBQyxDQUFBO1FBQ3RFLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsK0NBQStDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFFakYsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNO2FBQzFCLEdBQUcsQ0FBQyxzQkFBc0IsV0FBVyxFQUFFLENBQUM7YUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNiLElBQUksRUFBRSxDQUFBO1FBRVQsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDbkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLCtCQUErQixDQUFDLENBQUE7UUFDdEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUMsQ0FBQyxDQUFDLENBQUE7QUFFSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgfSBmcm9tICdAamFwYS9ydW5uZXInXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvRGF0YWJhc2UnXG5pbXBvcnQgeyBVc2VyRmFjdG9yeSB9IGZyb20gJ0RhdGFiYXNlL2ZhY3Rvcmllcy9Vc2VyRmFjdG9yeSdcbmltcG9ydCBVc2VyIGZyb20gJ0FwcC9Nb2RlbHMvVXNlcidcbmltcG9ydCB7IE9yZ2FuaXNhdGlvbkFjdGlvbnMgfSBmcm9tICdBcHAvQWN0aW9ucy9PcmdhbmlzYXRpb25BY3Rpb24nXG5pbXBvcnQgeyBPcmdhbmlzYXRpb25GYWN0b3J5IH0gZnJvbSAnRGF0YWJhc2UvZmFjdG9yaWVzL09yZ2FuaXNhdGlvbkZhY3RvcnknXG5cbnRlc3QuZ3JvdXAoJ0ZldGNoU2luZ2xlT3JnYW5pc2F0aW9uQ29udHJvbGxlcicsIChncm91cCkgPT4ge1xuICBsZXQgdXNlcjogVXNlclxuICBsZXQgdXNlcjI6IFVzZXJcbiAgbGV0IG9yZ0lkOiBzdHJpbmdcbiAgbGV0IHNlY29uZE9yZ0lkOiBzdHJpbmdcblxuICBncm91cC5zZXR1cChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2UuYmVnaW5HbG9iYWxUcmFuc2FjdGlvbigpXG5cbiAgICB1c2VyID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKClcbiAgICB1c2VyMiA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSgpXG4gICAgXG4gICAgY29uc3Qgb3JnYW5pc2F0aW9uID0gYXdhaXQgT3JnYW5pc2F0aW9uRmFjdG9yeS5jcmVhdGUoKVxuICAgIG9yZ0lkID0gb3JnYW5pc2F0aW9uLm9yZ0lkXG5cbiAgICBjb25zdCBvcmdhbmlzYXRpb24yID0gYXdhaXQgT3JnYW5pc2F0aW9uRmFjdG9yeS5jcmVhdGUoKVxuICAgIHNlY29uZE9yZ0lkID0gb3JnYW5pc2F0aW9uMi5vcmdJZFxuXG4gICAgYXdhaXQgT3JnYW5pc2F0aW9uQWN0aW9ucy5hZGRVc2VyVG9PcmdhbmlzYXRpb24oe1xuICAgICAgb3JnSWQ6IG9yZ2FuaXNhdGlvbi5pZCxcbiAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICB9KVxuICB9KVxuXG4gIGdyb3VwLnRlYXJkb3duKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5yb2xsYmFja0dsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMCBhbmQgb3JnYW5pc2F0aW9uIGRhdGEgaWYgb3JnYW5pc2F0aW9uIGlzIGZvdW5kJywgYXN5bmMgKHsgY2xpZW50LCBhc3NlcnQgfSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50XG4gICAgICAuZ2V0KGAvYXBpL29yZ2FuaXNhdGlvbnMvJHtvcmdJZH1gKVxuICAgICAgLmxvZ2luQXModXNlcilcbiAgICAgIC5zZW5kKClcblxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKDIwMClcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLnN0YXR1cywgJ3N1Y2Nlc3MnKVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkubWVzc2FnZSwgJ09yZ2FuaXNhdGlvbiBmZXRjaGVkIHN1Y2Nlc3NmdWxseScpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5kYXRhLm9yZ0lkLCBvcmdJZClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQwNCBpZiBvcmdhbmlzYXRpb24gaXMgbm90IGZvdW5kJywgYXN5bmMgKHsgY2xpZW50LCBhc3NlcnQgfSkgPT4ge1xuICAgIGNvbnN0IGZha2VPcmdJZCA9ICcxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDInXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnRcbiAgICAgIC5nZXQoYC9hcGkvb3JnYW5pc2F0aW9ucy8ke2Zha2VPcmdJZH1gKVxuICAgICAgLmxvZ2luQXModXNlcilcbiAgICAgIC5zZW5kKClcblxuICAgIHJlc3BvbnNlLmFzc2VydFN0YXR1cyg0MDQpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5zdGF0dXMsICdCYWQgUmVxdWVzdCcpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5tZXNzYWdlLCAnT3JnYW5pc2F0aW9uIHJlY29yZCBub3QgZm91bmQnKVxuICAgIGFzc2VydC5pc1VuZGVmaW5lZChyZXNwb25zZS5ib2R5KCkuZGF0YSlcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQwNCBpZiB1c2VyIG5vdCBpbiBvcmdhbmlzYXRpb24nLCBhc3luYyAoeyBjbGllbnQsIGFzc2VydCB9KSA9PiB7XG4gICAgXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnRcbiAgICAgIC5nZXQoYC9hcGkvb3JnYW5pc2F0aW9ucy8ke3NlY29uZE9yZ0lkfWApXG4gICAgICAubG9naW5Bcyh1c2VyKVxuICAgICAgLnNlbmQoKVxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKDQwNClcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLnN0YXR1cywgJ0JhZCBSZXF1ZXN0JylcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLm1lc3NhZ2UsICdPcmdhbmlzYXRpb24gcmVjb3JkIG5vdCBmb3VuZCcpXG4gICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlc3BvbnNlLmJvZHkoKS5kYXRhKVxuICB9KVxuXG59KVxuIl19