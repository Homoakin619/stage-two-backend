"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSuite = exports.runnerHooks = exports.reporters = exports.plugins = void 0;
const TestUtils_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/TestUtils"));
const preset_adonis_1 = require("@japa/preset-adonis");
exports.plugins = [(0, preset_adonis_1.assert)(), (0, preset_adonis_1.runFailedTests)(), (0, preset_adonis_1.apiClient)()];
exports.reporters = [(0, preset_adonis_1.specReporter)()];
exports.runnerHooks = {
    setup: [() => TestUtils_1.default.ace().loadCommands()],
    teardown: [],
};
const configureSuite = (suite) => {
    if (suite.name === 'functional') {
        suite.setup(() => TestUtils_1.default.httpServer().start());
    }
};
exports.configureSuite = configureSuite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFBLDRGQUFrRDtBQUNsRCx1REFBcUY7QUFheEUsUUFBQSxPQUFPLEdBQWdDLENBQUMsSUFBQSxzQkFBTSxHQUFFLEVBQUUsSUFBQSw4QkFBYyxHQUFFLEVBQUUsSUFBQSx5QkFBUyxHQUFFLENBQUMsQ0FBQTtBQVloRixRQUFBLFNBQVMsR0FBa0MsQ0FBQyxJQUFBLDRCQUFZLEdBQUUsQ0FBQyxDQUFBO0FBYzNELFFBQUEsV0FBVyxHQUFpRDtJQUN2RSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdDLFFBQVEsRUFBRSxFQUFFO0NBQ2IsQ0FBQTtBQWFNLE1BQU0sY0FBYyxHQUF1QyxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQzFFLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7S0FDbEQ7QUFDSCxDQUFDLENBQUE7QUFKWSxRQUFBLGNBQWMsa0JBSTFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGaWxlIHNvdXJjZTogaHR0cHM6Ly9iaXQubHkvM3VrYUhUelxuICpcbiAqIEZlZWwgZnJlZSB0byBsZXQgdXMga25vdyB2aWEgUFIsIGlmIHlvdSBmaW5kIHNvbWV0aGluZyBicm9rZW4gaW4gdGhpcyBjb250cmFjdFxuICogZmlsZS5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7IENvbmZpZyB9IGZyb20gJ0BqYXBhL3J1bm5lcidcbmltcG9ydCBUZXN0VXRpbHMgZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9UZXN0VXRpbHMnXG5pbXBvcnQgeyBhc3NlcnQsIHJ1bkZhaWxlZFRlc3RzLCBzcGVjUmVwb3J0ZXIsIGFwaUNsaWVudCB9IGZyb20gJ0BqYXBhL3ByZXNldC1hZG9uaXMnXG5cbi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgSmFwYSBQbHVnaW5zXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnxcbnwgSmFwYSBwbHVnaW5zIGFsbG93cyB5b3UgdG8gYWRkIGFkZGl0aW9uYWwgZmVhdHVyZXMgdG8gSmFwYS4gQnkgZGVmYXVsdFxufCB3ZSByZWdpc3RlciB0aGUgYXNzZXJ0aW9uIHBsdWdpbi5cbnxcbnwgRmVlbCBmcmVlIHRvIHJlbW92ZSBleGlzdGluZyBwbHVnaW5zIG9yIGFkZCBtb3JlLlxufFxuKi9cbmV4cG9ydCBjb25zdCBwbHVnaW5zOiBSZXF1aXJlZDxDb25maWc+WydwbHVnaW5zJ10gPSBbYXNzZXJ0KCksIHJ1bkZhaWxlZFRlc3RzKCksIGFwaUNsaWVudCgpXVxuXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IEphcGEgUmVwb3J0ZXJzXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnxcbnwgSmFwYSByZXBvcnRlcnMgZGlzcGxheXMvc2F2ZXMgdGhlIHByb2dyZXNzIG9mIHRlc3RzIGFzIHRoZXkgYXJlIGV4ZWN1dGVkLlxufCBCeSBkZWZhdWx0LCB3ZSByZWdpc3RlciB0aGUgc3BlYyByZXBvcnRlciB0byBzaG93IGEgZGV0YWlsZWQgcmVwb3J0XG58IG9mIHRlc3RzIG9uIHRoZSB0ZXJtaW5hbC5cbnxcbiovXG5leHBvcnQgY29uc3QgcmVwb3J0ZXJzOiBSZXF1aXJlZDxDb25maWc+WydyZXBvcnRlcnMnXSA9IFtzcGVjUmVwb3J0ZXIoKV1cblxuLypcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBSdW5uZXIgaG9va3NcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufFxufCBSdW5uZXIgaG9va3MgYXJlIGV4ZWN1dGVkIGFmdGVyIGJvb3RpbmcgdGhlIEFkb25pc0pTIGFwcCBhbmRcbnwgYmVmb3JlIHRoZSB0ZXN0IGZpbGVzIGFyZSBpbXBvcnRlZC5cbnxcbnwgWW91IGNhbiBwZXJmb3JtIGFjdGlvbnMgbGlrZSBzdGFydGluZyB0aGUgSFRUUCBzZXJ2ZXIgb3IgcnVubmluZyBtaWdyYXRpb25zXG58IHdpdGhpbiB0aGUgcnVubmVyIGhvb2tzXG58XG4qL1xuZXhwb3J0IGNvbnN0IHJ1bm5lckhvb2tzOiBQaWNrPFJlcXVpcmVkPENvbmZpZz4sICdzZXR1cCcgfCAndGVhcmRvd24nPiA9IHtcbiAgc2V0dXA6IFsoKSA9PiBUZXN0VXRpbHMuYWNlKCkubG9hZENvbW1hbmRzKCldLFxuICB0ZWFyZG93bjogW10sXG59XG5cbi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29uZmlndXJlIGluZGl2aWR1YWwgc3VpdGVzXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnxcbnwgVGhlIGNvbmZpZ3VyZVN1aXRlIG1ldGhvZCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgdGVzdCBzdWl0ZSByZWdpc3RlcmVkXG58IHdpdGhpbiBcIi5hZG9uaXNyYy5qc29uXCIgZmlsZS5cbnxcbnwgWW91IGNhbiB1c2UgdGhpcyBtZXRob2QgdG8gY29uZmlndXJlIHN1aXRlcy4gRm9yIGV4YW1wbGU6IE9ubHkgc3RhcnRcbnwgdGhlIEhUVFAgc2VydmVyIHdoZW4gaXQgaXMgYSBmdW5jdGlvbmFsIHN1aXRlLlxuKi9cbmV4cG9ydCBjb25zdCBjb25maWd1cmVTdWl0ZTogUmVxdWlyZWQ8Q29uZmlnPlsnY29uZmlndXJlU3VpdGUnXSA9IChzdWl0ZSkgPT4ge1xuICBpZiAoc3VpdGUubmFtZSA9PT0gJ2Z1bmN0aW9uYWwnKSB7XG4gICAgc3VpdGUuc2V0dXAoKCkgPT4gVGVzdFV0aWxzLmh0dHBTZXJ2ZXIoKS5zdGFydCgpKVxuICB9XG59XG4iXX0=