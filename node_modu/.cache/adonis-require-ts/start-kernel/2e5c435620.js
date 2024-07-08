"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Server"));
Server_1.default.middleware.register([
    () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("Adonis/Core/BodyParser"))),
]);
Server_1.default.middleware.registerNamed({
    api: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Auth")))
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2VybmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsia2VybmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSxzRkFBNEM7QUFXNUMsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO0lBQ3pCLEdBQUcsRUFBRSxvR0FBc0M7Q0FDNUMsQ0FBQyxDQUFBO0FBa0JGLGdCQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUM5QixHQUFHLEVBQUUsR0FBRyxFQUFFLHlFQUFRLHFCQUFxQixHQUFDO0NBQ3pDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQXBwbGljYXRpb24gbWlkZGxld2FyZVxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58XG58IFRoaXMgZmlsZSBpcyB1c2VkIHRvIGRlZmluZSBtaWRkbGV3YXJlIGZvciBIVFRQIHJlcXVlc3RzLiBZb3UgY2FuIHJlZ2lzdGVyXG58IG1pZGRsZXdhcmUgYXMgYSBgY2xvc3VyZWAgb3IgYW4gSW9DIGNvbnRhaW5lciBiaW5kaW5nLiBUaGUgYmluZGluZ3MgYXJlXG58IHByZWZlcnJlZCwgc2luY2UgdGhleSBrZWVwIHRoaXMgZmlsZSBjbGVhbi5cbnxcbiovXG5cbmltcG9ydCBTZXJ2ZXIgZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9TZXJ2ZXInXG5cbi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgR2xvYmFsIG1pZGRsZXdhcmVcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufFxufCBBbiBhcnJheSBvZiBnbG9iYWwgbWlkZGxld2FyZSwgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBvcmRlciB0aGV5XG58IGFyZSBkZWZpbmVkIGZvciBldmVyeSBIVFRQIHJlcXVlc3RzLlxufFxuKi9cblNlcnZlci5taWRkbGV3YXJlLnJlZ2lzdGVyKFtcbiAgKCkgPT4gaW1wb3J0KCdAaW9jOkFkb25pcy9Db3JlL0JvZHlQYXJzZXInKSxcbl0pXG5cbi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgTmFtZWQgbWlkZGxld2FyZVxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58XG58IE5hbWVkIG1pZGRsZXdhcmUgYXJlIGRlZmluZWQgYXMga2V5LXZhbHVlIHBhaXIuIFRoZSB2YWx1ZSBpcyB0aGUgbmFtZXNwYWNlXG58IG9yIG1pZGRsZXdhcmUgZnVuY3Rpb24gYW5kIGtleSBpcyB0aGUgYWxpYXMuIExhdGVyIHlvdSBjYW4gdXNlIHRoZXNlXG58IGFsaWFzIG9uIGluZGl2aWR1YWwgcm91dGVzLiBGb3IgZXhhbXBsZTpcbnxcbnwgeyBhdXRoOiAoKSA9PiBpbXBvcnQoJ0FwcC9NaWRkbGV3YXJlL0F1dGgnKSB9XG58XG58IGFuZCB0aGVuIHVzZSBpdCBhcyBmb2xsb3dzXG58XG58IFJvdXRlLmdldCgnZGFzaGJvYXJkJywgJ1VzZXJDb250cm9sbGVyLmRhc2hib2FyZCcpLm1pZGRsZXdhcmUoJ2F1dGgnKVxufFxuKi9cblNlcnZlci5taWRkbGV3YXJlLnJlZ2lzdGVyTmFtZWQoe1xuICBhcGk6ICgpID0+IGltcG9ydChcIkFwcC9NaWRkbGV3YXJlL0F1dGhcIilcbn0pXG4iXX0=