"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
(0, runner_1.test)('display welcome page', async ({ client }) => {
    const response = await client.get('/');
    response.assertStatus(200);
    response.assertBodyContains({ hello: 'world' });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG9fd29ybGQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbGxvX3dvcmxkLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBbUM7QUFFbkMsSUFBQSxhQUFJLEVBQUMsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtJQUNoRCxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFdEMsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMxQixRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtBQUNqRCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgfSBmcm9tICdAamFwYS9ydW5uZXInXG5cbnRlc3QoJ2Rpc3BsYXkgd2VsY29tZSBwYWdlJywgYXN5bmMgKHsgY2xpZW50IH0pID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuZ2V0KCcvJylcblxuICByZXNwb25zZS5hc3NlcnRTdGF0dXMoMjAwKVxuICByZXNwb25zZS5hc3NlcnRCb2R5Q29udGFpbnMoeyBoZWxsbzogJ3dvcmxkJyB9KVxufSlcbiJdfQ==