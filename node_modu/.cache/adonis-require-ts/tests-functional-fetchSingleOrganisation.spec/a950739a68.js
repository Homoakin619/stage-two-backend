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
        console.log(response.body());
        assert.equal(response.body().status, 'Error');
        stub.restore();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hTaW5nbGVPcmdhbmlzYXRpb24uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZldGNoU2luZ2xlT3JnYW5pc2F0aW9uLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBbUM7QUFDbkMsMkZBQWlEO0FBQ2pELHNGQUE0RDtBQUU1RCw2RkFBb0U7QUFDcEUsc0dBQTRFO0FBQzVFLDZFQUFvRDtBQUNwRCxrREFBeUI7QUFFekIsYUFBSSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3hELElBQUksSUFBVSxDQUFBO0lBQ2QsSUFBSSxLQUFhLENBQUE7SUFFakIsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNyQixNQUFNLGtCQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtRQUV2QyxJQUFJLEdBQUcsTUFBTSx5QkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLE1BQU0seUNBQW1CLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDdkQsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUE7UUFFMUIsTUFBTSx3Q0FBbUIsQ0FBQyxxQkFBcUIsQ0FBQztZQUM5QyxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUU7WUFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2hCLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLGtFQUFrRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3BHLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTTthQUMxQixHQUFHLENBQUMsc0JBQXNCLEtBQUssRUFBRSxDQUFDO2FBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDYixJQUFJLEVBQUUsQ0FBQTtRQUdULFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBO1FBQzFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDakQsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGFBQUksRUFBQyxnREFBZ0QsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNsRixNQUFNLFNBQVMsR0FBRyxzQ0FBc0MsQ0FBQTtRQUN4RCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU07YUFDMUIsR0FBRyxDQUFDLHNCQUFzQixTQUFTLEVBQUUsQ0FBQzthQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ2IsSUFBSSxFQUFFLENBQUE7UUFFVCxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsK0JBQStCLENBQUMsQ0FBQTtRQUN0RSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHNDQUFzQyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBRXhFLE1BQU0sSUFBSSxHQUFHLGVBQUssQ0FBQyxJQUFJLENBQUMsd0JBQVcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7UUFFbkcsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNO2FBQzFCLEdBQUcsQ0FBQyxzQkFBc0IsS0FBSyxFQUFFLENBQUM7YUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNiLElBQUksRUFBRSxDQUFBO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUc5QixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFJN0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IH0gZnJvbSAnQGphcGEvcnVubmVyJ1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJ0Bpb2M6QWRvbmlzL0x1Y2lkL0RhdGFiYXNlJ1xuaW1wb3J0IHsgVXNlckZhY3RvcnkgfSBmcm9tICdEYXRhYmFzZS9mYWN0b3JpZXMvVXNlckZhY3RvcnknXG5pbXBvcnQgVXNlciBmcm9tICdBcHAvTW9kZWxzL1VzZXInXG5pbXBvcnQgeyBPcmdhbmlzYXRpb25BY3Rpb25zIH0gZnJvbSAnQXBwL0FjdGlvbnMvT3JnYW5pc2F0aW9uQWN0aW9uJ1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uRmFjdG9yeSB9IGZyb20gJ0RhdGFiYXNlL2ZhY3Rvcmllcy9PcmdhbmlzYXRpb25GYWN0b3J5J1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICdBcHAvQWN0aW9ucy9Vc2VyQWN0aW9uJ1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJ1xuXG50ZXN0Lmdyb3VwKCdGZXRjaFNpbmdsZU9yZ2FuaXNhdGlvbkNvbnRyb2xsZXInLCAoZ3JvdXApID0+IHtcbiAgbGV0IHVzZXI6IFVzZXJcbiAgbGV0IG9yZ0lkOiBzdHJpbmdcblxuICBncm91cC5zZXR1cChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2UuYmVnaW5HbG9iYWxUcmFuc2FjdGlvbigpXG5cbiAgICB1c2VyID0gYXdhaXQgVXNlckZhY3RvcnkuY3JlYXRlKClcbiAgICBjb25zdCBvcmdhbmlzYXRpb24gPSBhd2FpdCBPcmdhbmlzYXRpb25GYWN0b3J5LmNyZWF0ZSgpXG4gICAgb3JnSWQgPSBvcmdhbmlzYXRpb24ub3JnSWRcblxuICAgIGF3YWl0IE9yZ2FuaXNhdGlvbkFjdGlvbnMuYWRkVXNlclRvT3JnYW5pc2F0aW9uKHtcbiAgICAgIG9yZ0lkOiBvcmdhbmlzYXRpb24uaWQsXG4gICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgfSlcbiAgfSlcblxuICBncm91cC50ZWFyZG93bihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2Uucm9sbGJhY2tHbG9iYWxUcmFuc2FjdGlvbigpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiAyMDAgYW5kIG9yZ2FuaXNhdGlvbiBkYXRhIGlmIG9yZ2FuaXNhdGlvbiBpcyBmb3VuZCcsIGFzeW5jICh7IGNsaWVudCwgYXNzZXJ0IH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudFxuICAgICAgLmdldChgL2FwaS9vcmdhbmlzYXRpb25zLyR7b3JnSWR9YClcbiAgICAgIC5sb2dpbkFzKHVzZXIpXG4gICAgICAuc2VuZCgpXG5cblxuICAgIHJlc3BvbnNlLmFzc2VydFN0YXR1cygyMDApXG4gICAgYXNzZXJ0LmVxdWFsKHJlc3BvbnNlLmJvZHkoKS5zdGF0dXMsICdzdWNjZXNzJylcbiAgICBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLm1lc3NhZ2UsICdPcmdhbmlzYXRpb24gZmV0Y2hlZCBzdWNjZXNzZnVsbHknKVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkuZGF0YS5vcmdJZCwgb3JnSWQpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MDQgaWYgb3JnYW5pc2F0aW9uIGlzIG5vdCBmb3VuZCcsIGFzeW5jICh7IGNsaWVudCwgYXNzZXJ0IH0pID0+IHtcbiAgICBjb25zdCBmYWtlT3JnSWQgPSAnMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAyJ1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50XG4gICAgICAuZ2V0KGAvYXBpL29yZ2FuaXNhdGlvbnMvJHtmYWtlT3JnSWR9YClcbiAgICAgIC5sb2dpbkFzKHVzZXIpXG4gICAgICAuc2VuZCgpXG5cbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoNDA0KVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkuc3RhdHVzLCAnQmFkIFJlcXVlc3QnKVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkubWVzc2FnZSwgJ09yZ2FuaXNhdGlvbiByZWNvcmQgbm90IGZvdW5kJylcbiAgICBhc3NlcnQuaXNVbmRlZmluZWQocmVzcG9uc2UuYm9keSgpLmRhdGEpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA1MDAgaWYgYW4gZXJyb3Igb2NjdXJzJywgYXN5bmMgKHsgY2xpZW50LCBhc3NlcnQgfSkgPT4ge1xuICAgIC8vIFNpbXVsYXRlIGFuIGVycm9yIGJ5IHN0dWJiaW5nIHRoZSBmZXRjaFVzZXJPcmdhbmlzYXRpb25zIG1ldGhvZFxuICAgIGNvbnN0IHN0dWIgPSBzaW5vbi5zdHViKFVzZXJBY3Rpb25zLCAnZmV0Y2hVc2VyT3JnYW5pc2F0aW9ucycpLnRocm93cyhuZXcgRXJyb3IoJ1NpbXVsYXRlZCBlcnJvcicpKVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnRcbiAgICAgIC5nZXQoYC9hcGkvb3JnYW5pc2F0aW9ucy8ke29yZ0lkfWApXG4gICAgICAubG9naW5Bcyh1c2VyKVxuICAgICAgLnNlbmQoKVxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuYm9keSgpKVxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLnN0YXR1cylcbiAgICAvLyByZXNwb25zZS5hc3NlcnRTdGF0dXMoNTAwKVxuICAgIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkuc3RhdHVzLCAnRXJyb3InKVxuICAgIC8vIGFzc2VydC5lcXVhbChyZXNwb25zZS5ib2R5KCkubWVzc2FnZSwgJ0Vycm9yIE9jY3VyZWQgRmV0Y2hpbmcgT3JnYW5pc2F0aW9uJylcbiAgICAvLyBhc3NlcnQuZXF1YWwocmVzcG9uc2UuYm9keSgpLnN0YXR1c0NvZGUsIDUwMClcblxuICAgIHN0dWIucmVzdG9yZSgpXG4gIH0pXG59KVxuIl19