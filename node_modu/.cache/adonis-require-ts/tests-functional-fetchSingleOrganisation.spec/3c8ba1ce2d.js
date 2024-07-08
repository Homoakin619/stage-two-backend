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
    (0, runner_1.test)('should return 500 if an error occurs', async ({ client, assert }) => {
        const stub = sinon_1.default.stub(UserAction_1.UserActions, 'fetchUserOrganisations').throws(new Error('Simulated error'));
        const response = await client
            .get(`/api/organisations/${orgId}`)
            .loginAs(user)
            .send();
        assert.equal(response.body().status, 'Error');
        stub.restore();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hTaW5nbGVPcmdhbmlzYXRpb24uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZldGNoU2luZ2xlT3JnYW5pc2F0aW9uLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBbUM7QUFDbkMsMkZBQWlEO0FBQ2pELHNGQUE0RDtBQUU1RCw2RkFBb0U7QUFDcEUsc0dBQTRFO0FBQzVFLDZFQUFvRDtBQUNwRCxrREFBeUI7QUFFekIsYUFBSSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3hELElBQUksSUFBVSxDQUFBO0lBQ2QsSUFBSSxLQUFhLENBQUE7SUFFakIsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNyQixNQUFNLGtCQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtRQUV2QyxJQUFJLEdBQUcsTUFBTSx5QkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLE1BQU0seUNBQW1CLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDdkQsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUE7UUFFMUIsTUFBTSx3Q0FBbUIsQ0FBQyxxQkFBcUIsQ0FBQztZQUM5QyxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUU7WUFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2hCLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLGtFQUFrRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3BHLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTTthQUMxQixHQUFHLENBQUMsc0JBQXNCLEtBQUssRUFBRSxDQUFDO2FBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDYixJQUFJLEVBQUUsQ0FBQTtRQUdULFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBO1FBQzFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDakQsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGFBQUksRUFBQyxnREFBZ0QsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNsRixNQUFNLFNBQVMsR0FBRyxzQ0FBc0MsQ0FBQTtRQUN4RCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU07YUFDMUIsR0FBRyxDQUFDLHNCQUFzQixTQUFTLEVBQUUsQ0FBQzthQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ2IsSUFBSSxFQUFFLENBQUE7UUFFVCxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsK0JBQStCLENBQUMsQ0FBQTtRQUN0RSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHNDQUFzQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBRXhFLE1BQU0sSUFBSSxHQUFHLGVBQUssQ0FBQyxJQUFJLENBQUMsd0JBQVcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7UUFFbkcsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNO2FBQzFCLEdBQUcsQ0FBQyxzQkFBc0IsS0FBSyxFQUFFLENBQUM7YUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNiLElBQUksRUFBRSxDQUFBO1FBR1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBSTdDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNoQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJ0BqYXBhL3J1bm5lcidcbmltcG9ydCBEYXRhYmFzZSBmcm9tICdAaW9jOkFkb25pcy9MdWNpZC9EYXRhYmFzZSdcbmltcG9ydCB7IFVzZXJGYWN0b3J5IH0gZnJvbSAnRGF0YWJhc2UvZmFjdG9yaWVzL1VzZXJGYWN0b3J5J1xuaW1wb3J0IFVzZXIgZnJvbSAnQXBwL01vZGVscy9Vc2VyJ1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uQWN0aW9ucyB9IGZyb20gJ0FwcC9BY3Rpb25zL09yZ2FuaXNhdGlvbkFjdGlvbidcbmltcG9ydCB7IE9yZ2FuaXNhdGlvbkZhY3RvcnkgfSBmcm9tICdEYXRhYmFzZS9mYWN0b3JpZXMvT3JnYW5pc2F0aW9uRmFjdG9yeSdcbmltcG9ydCB7IFVzZXJBY3Rpb25zIH0gZnJvbSAnQXBwL0FjdGlvbnMvVXNlckFjdGlvbidcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbidcblxudGVzdC5ncm91cCgnRmV0Y2hTaW5nbGVPcmdhbmlzYXRpb25Db250cm9sbGVyJywgKGdyb3VwKSA9PiB7XG4gIGxldCB1c2VyOiBVc2VyXG4gIGxldCBvcmdJZDogc3RyaW5nXG5cbiAgZ3JvdXAuc2V0dXAoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IERhdGFiYXNlLmJlZ2luR2xvYmFsVHJhbnNhY3Rpb24oKVxuXG4gICAgdXNlciA9IGF3YWl0IFVzZXJGYWN0b3J5LmNyZWF0ZSgpXG4gICAgY29uc3Qgb3JnYW5pc2F0aW9uID0gYXdhaXQgT3JnYW5pc2F0aW9uRmFjdG9yeS5jcmVhdGUoKVxuICAgIG9yZ0lkID0gb3JnYW5pc2F0aW9uLm9yZ0lkXG5cbiAgICBhd2FpdCBPcmdhbmlzYXRpb25BY3Rpb25zLmFkZFVzZXJUb09yZ2FuaXNhdGlvbih7XG4gICAgICBvcmdJZDogb3JnYW5pc2F0aW9uLmlkLFxuICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgIH0pXG4gIH0pXG5cbiAgZ3JvdXAudGVhcmRvd24oYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IERhdGFiYXNlLnJvbGxiYWNrR2xvYmFsVHJhbnNhY3Rpb24oKVxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gMjAwIGFuZCBvcmdhbmlzYXRpb24gZGF0YSBpZiBvcmdhbmlzYXRpb24gaXMgZm91bmQnLCBhc3luYyAoeyBjbGllbnQsIGFzc2VydCB9KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnRcbiAgICAgIC5nZXQoYC9hcGkvb3JnYW5pc2F0aW9ucy8ke29yZ0lkfWApXG4gICAgICAubG9naW5Bcyh1c2VyKVxuICAgICAgLnNlbmQoKVxuXG5cbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoMjAwKVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkuc3RhdHVzLCAnc3VjY2VzcycpXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5tZXNzYWdlLCAnT3JnYW5pc2F0aW9uIGZldGNoZWQgc3VjY2Vzc2Z1bGx5JylcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLmRhdGEub3JnSWQsIG9yZ0lkKVxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gNDA0IGlmIG9yZ2FuaXNhdGlvbiBpcyBub3QgZm91bmQnLCBhc3luYyAoeyBjbGllbnQsIGFzc2VydCB9KSA9PiB7XG4gICAgY29uc3QgZmFrZU9yZ0lkID0gJzEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMidcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudFxuICAgICAgLmdldChgL2FwaS9vcmdhbmlzYXRpb25zLyR7ZmFrZU9yZ0lkfWApXG4gICAgICAubG9naW5Bcyh1c2VyKVxuICAgICAgLnNlbmQoKVxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKDQwNClcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLnN0YXR1cywgJ0JhZCBSZXF1ZXN0JylcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLm1lc3NhZ2UsICdPcmdhbmlzYXRpb24gcmVjb3JkIG5vdCBmb3VuZCcpXG4gICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlc3BvbnNlLmJvZHkoKS5kYXRhKVxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gNTAwIGlmIGFuIGVycm9yIG9jY3VycycsIGFzeW5jICh7IGNsaWVudCwgYXNzZXJ0IH0pID0+IHtcbiAgICAvLyBTaW11bGF0ZSBhbiBlcnJvciBieSBzdHViYmluZyB0aGUgZmV0Y2hVc2VyT3JnYW5pc2F0aW9ucyBtZXRob2RcbiAgICBjb25zdCBzdHViID0gc2lub24uc3R1YihVc2VyQWN0aW9ucywgJ2ZldGNoVXNlck9yZ2FuaXNhdGlvbnMnKS50aHJvd3MobmV3IEVycm9yKCdTaW11bGF0ZWQgZXJyb3InKSlcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50XG4gICAgICAuZ2V0KGAvYXBpL29yZ2FuaXNhdGlvbnMvJHtvcmdJZH1gKVxuICAgICAgLmxvZ2luQXModXNlcilcbiAgICAgIC5zZW5kKClcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMpXG4gICAgLy8gcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKDUwMClcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLnN0YXR1cywgJ0Vycm9yJylcbiAgICAvLyBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLm1lc3NhZ2UsICdFcnJvciBPY2N1cmVkIEZldGNoaW5nIE9yZ2FuaXNhdGlvbicpXG4gICAgLy8gYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5zdGF0dXNDb2RlLCA1MDApXG5cbiAgICBzdHViLnJlc3RvcmUoKVxuICB9KVxufSlcbiJdfQ==