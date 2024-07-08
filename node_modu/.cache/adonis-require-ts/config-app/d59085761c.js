"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = exports.profiler = exports.logger = exports.http = exports.appKey = void 0;
const proxy_addr_1 = __importDefault(require("proxy-addr"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
exports.appKey = Env_1.default.get('APP_KEY');
exports.http = {
    allowMethodSpoofing: false,
    subdomainOffset: 2,
    generateRequestId: false,
    trustProxy: proxy_addr_1.default.compile('loopback'),
    etag: false,
    jsonpCallbackName: 'callback',
    cookie: {
        domain: '',
        path: '/',
        maxAge: '2h',
        httpOnly: true,
        secure: false,
        sameSite: false,
    },
    forceContentNegotiationTo: 'application/json',
};
exports.logger = {
    name: Env_1.default.get('APP_NAME'),
    enabled: true,
    level: Env_1.default.get('LOG_LEVEL', 'info'),
    prettyPrint: Env_1.default.get('NODE_ENV') === 'development',
};
exports.profiler = {
    enabled: true,
    blacklist: [],
    whitelist: [],
};
exports.validator = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU9BLDREQUFrQztBQUNsQyxnRkFBc0M7QUFtQnpCLFFBQUEsTUFBTSxHQUFXLGFBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7QUFXbkMsUUFBQSxJQUFJLEdBQWlCO0lBWWhDLG1CQUFtQixFQUFFLEtBQUs7SUFPMUIsZUFBZSxFQUFFLENBQUM7SUFXbEIsaUJBQWlCLEVBQUUsS0FBSztJQVd4QixVQUFVLEVBQUUsb0JBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBVXpDLElBQUksRUFBRSxLQUFLO0lBT1gsaUJBQWlCLEVBQUUsVUFBVTtJQU83QixNQUFNLEVBQUU7UUFDTixNQUFNLEVBQUUsRUFBRTtRQUNWLElBQUksRUFBRSxHQUFHO1FBQ1QsTUFBTSxFQUFFLElBQUk7UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxLQUFLO1FBQ2IsUUFBUSxFQUFFLEtBQUs7S0FDaEI7SUFrQkQseUJBQXlCLEVBQUUsa0JBQWtCO0NBQzlDLENBQUE7QUFPWSxRQUFBLE1BQU0sR0FBaUI7SUFhbEMsSUFBSSxFQUFFLGFBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBVXpCLE9BQU8sRUFBRSxJQUFJO0lBWWIsS0FBSyxFQUFFLGFBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztJQVduQyxXQUFXLEVBQUUsYUFBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxhQUFhO0NBQ25ELENBQUE7QUFPWSxRQUFBLFFBQVEsR0FBbUI7SUFTdEMsT0FBTyxFQUFFLElBQUk7SUFXYixTQUFTLEVBQUUsRUFBRTtJQVdiLFNBQVMsRUFBRSxFQUFFO0NBQ2QsQ0FBQTtBQVdZLFFBQUEsU0FBUyxHQUFvQixFQUN6QyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb25maWcgc291cmNlOiBodHRwczovL2dpdC5pby9KZmVmWlxuICpcbiAqIEZlZWwgZnJlZSB0byBsZXQgdXMga25vdyB2aWEgUFIsIGlmIHlvdSBmaW5kIHNvbWV0aGluZyBicm9rZW4gaW4gdGhpcyBjb25maWdcbiAqIGZpbGUuXG4gKi9cblxuaW1wb3J0IHByb3h5QWRkciBmcm9tICdwcm94eS1hZGRyJ1xuaW1wb3J0IEVudiBmcm9tICdAaW9jOkFkb25pcy9Db3JlL0VudidcbmltcG9ydCB0eXBlIHsgU2VydmVyQ29uZmlnIH0gZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9TZXJ2ZXInXG5pbXBvcnQgdHlwZSB7IExvZ2dlckNvbmZpZyB9IGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvTG9nZ2VyJ1xuaW1wb3J0IHR5cGUgeyBQcm9maWxlckNvbmZpZyB9IGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvUHJvZmlsZXInXG5pbXBvcnQgdHlwZSB7IFZhbGlkYXRvckNvbmZpZyB9IGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvVmFsaWRhdG9yJ1xuXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IEFwcGxpY2F0aW9uIHNlY3JldCBrZXlcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufFxufCBUaGUgc2VjcmV0IHRvIGVuY3J5cHQgYW5kIHNpZ24gZGlmZmVyZW50IHZhbHVlcyBpbiB5b3VyIGFwcGxpY2F0aW9uLlxufCBNYWtlIHN1cmUgdG8ga2VlcCB0aGUgYEFQUF9LRVlgIGFzIGFuIGVudmlyb25tZW50IHZhcmlhYmxlIGFuZCBzZWN1cmUuXG58XG58IE5vdGU6IENoYW5naW5nIHRoZSBhcHBsaWNhdGlvbiBrZXkgZm9yIGFuIGV4aXN0aW5nIGFwcCB3aWxsIG1ha2UgYWxsXG58IHRoZSBjb29raWVzIGludmFsaWQgYW5kIGFsc28gdGhlIGV4aXN0aW5nIGVuY3J5cHRlZCBkYXRhIHdpbGwgbm90XG58IGJlIGRlY3J5cHRlZC5cbnxcbiovXG5leHBvcnQgY29uc3QgYXBwS2V5OiBzdHJpbmcgPSBFbnYuZ2V0KCdBUFBfS0VZJylcblxuLypcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBIdHRwIHNlcnZlciBjb25maWd1cmF0aW9uXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnxcbnwgVGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBIVFRQKHMpIHNlcnZlci4gTWFrZSBzdXJlIHRvIGdvIHRocm91Z2ggYWxsXG58IHRoZSBjb25maWcgcHJvcGVydGllcyB0byBtYWtlIGtlZXAgc2VydmVyIHNlY3VyZS5cbnxcbiovXG5leHBvcnQgY29uc3QgaHR0cDogU2VydmVyQ29uZmlnID0ge1xuICAvKlxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfCBBbGxvdyBtZXRob2Qgc3Bvb2ZpbmdcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBNZXRob2Qgc3Bvb2ZpbmcgZW5hYmxlcyBkZWZpbmluZyBjdXN0b20gSFRUUCBtZXRob2RzIHVzaW5nIGEgcXVlcnkgc3RyaW5nXG4gIHwgYF9tZXRob2RgLiBUaGlzIGlzIHVzdWFsbHkgcmVxdWlyZWQgd2hlbiB5b3UgYXJlIG1ha2luZyB0cmFkaXRpb25hbFxuICB8IGZvcm0gcmVxdWVzdHMgYW5kIHdhbnRzIHRvIHVzZSBIVFRQIHZlcmJzIGxpa2UgYFBVVGAsIGBERUxFVEVgIGFuZFxuICB8IHNvIG9uLlxuICB8XG4gICovXG4gIGFsbG93TWV0aG9kU3Bvb2Zpbmc6IGZhbHNlLFxuXG4gIC8qXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8IFN1YmRvbWFpbiBvZmZzZXRcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICovXG4gIHN1YmRvbWFpbk9mZnNldDogMixcblxuICAvKlxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfCBSZXF1ZXN0IElkc1xuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IFNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAgd2lsbCBnZW5lcmF0ZSBhIHVuaXF1ZSByZXF1ZXN0IGlkIGZvciBlYWNoXG4gIHwgSFRUUCByZXF1ZXN0IGFuZCBzZXQgaXQgYXMgYHgtcmVxdWVzdC1pZGAgaGVhZGVyLlxuICB8XG4gICovXG4gIGdlbmVyYXRlUmVxdWVzdElkOiBmYWxzZSxcblxuICAvKlxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfCBUcnVzdGluZyBwcm94eSBzZXJ2ZXJzXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8XG4gIHwgRGVmaW5lIHRoZSBwcm94eSBzZXJ2ZXJzIHRoYXQgQWRvbmlzSnMgbXVzdCB0cnVzdCBmb3IgcmVhZGluZyBgWC1Gb3J3YXJkZWRgXG4gIHwgaGVhZGVycy5cbiAgfFxuICAqL1xuICB0cnVzdFByb3h5OiBwcm94eUFkZHIuY29tcGlsZSgnbG9vcGJhY2snKSxcblxuICAvKlxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfCBHZW5lcmF0aW5nIEV0YWdcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBXaGV0aGVyIG9yIG5vdCB0byBnZW5lcmF0ZSBhbiBldGFnIGZvciBldmVyeSByZXNwb25zZS5cbiAgfFxuICAqL1xuICBldGFnOiBmYWxzZSxcblxuICAvKlxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfCBKU09OUCBDYWxsYmFja1xuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgKi9cbiAganNvbnBDYWxsYmFja05hbWU6ICdjYWxsYmFjaycsXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgQ29va2llIHNldHRpbmdzXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAqL1xuICBjb29raWU6IHtcbiAgICBkb21haW46ICcnLFxuICAgIHBhdGg6ICcvJyxcbiAgICBtYXhBZ2U6ICcyaCcsXG4gICAgaHR0cE9ubHk6IHRydWUsXG4gICAgc2VjdXJlOiBmYWxzZSxcbiAgICBzYW1lU2l0ZTogZmFsc2UsXG4gIH0sXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgRm9yY2UgQ29udGVudCBOZWdvdGlhdGlvblxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IFRoZSBpbnRlcm5hbHMgb2YgdGhlIGZyYW1ld29yayByZWxpZXMgb24gdGhlIGNvbnRlbnQgbmVnb3RpYXRpb24gdG9cbiAgfCBkZXRlY3QgdGhlIGJlc3QgcG9zc2libGUgcmVzcG9uc2UgdHlwZSBmb3IgYSBnaXZlbiBIVFRQIHJlcXVlc3QuXG4gIHxcbiAgfCBIb3dldmVyLCBpdCBpcyBhIHZlcnkgY29tbW9uIHRoZXNlIGRheXMgdGhhdCBBUEkgc2VydmVycyBhbHdheXMgd2FudHMgdG9cbiAgfCBtYWtlIHJlc3BvbnNlIGluIEpTT04gcmVnYXJkbGVzcyBvZiB0aGUgZXhpc3RlbmNlIG9mIHRoZSBgQWNjZXB0YCBoZWFkZXIuXG4gIHxcbiAgfCBCeSBzZXR0aW5nIGBmb3JjZUNvbnRlbnROZWdvdGlhdGlvblRvID0gJ2FwcGxpY2F0aW9uL2pzb24nYCwgeW91IG5lZ290aWF0ZVxuICB8IHdpdGggdGhlIHNlcnZlciBpbiBhZHZhbmNlIHRvIGFsd2F5cyByZXR1cm4gSlNPTiB3aXRob3V0IHJlbHlpbmcgb24gdGhlXG4gIHwgY2xpZW50IHRvIHNldCB0aGUgaGVhZGVyIGV4cGxpY2l0bHkuXG4gIHxcbiAgKi9cbiAgZm9yY2VDb250ZW50TmVnb3RpYXRpb25UbzogJ2FwcGxpY2F0aW9uL2pzb24nLFxufVxuXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IExvZ2dlclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuZXhwb3J0IGNvbnN0IGxvZ2dlcjogTG9nZ2VyQ29uZmlnID0ge1xuICAvKlxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfCBBcHBsaWNhdGlvbiBuYW1lXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8XG4gIHwgVGhlIG5hbWUgb2YgdGhlIGFwcGxpY2F0aW9uIHlvdSB3YW50IHRvIGFkZCB0byB0aGUgbG9nLiBJdCBpcyByZWNvbW1lbmRlZFxuICB8IHRvIGFsd2F5cyBoYXZlIGFwcCBuYW1lIGluIGV2ZXJ5IGxvZyBsaW5lLlxuICB8XG4gIHwgVGhlIGBBUFBfTkFNRWAgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgYXV0b21hdGljYWxseSBzZXQgYnkgQWRvbmlzSlMgYnlcbiAgfCByZWFkaW5nIHRoZSBgbmFtZWAgcHJvcGVydHkgZnJvbSB0aGUgYHBhY2thZ2UuanNvbmAgZmlsZS5cbiAgfFxuICAqL1xuICBuYW1lOiBFbnYuZ2V0KCdBUFBfTkFNRScpLFxuXG4gIC8qXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8IFRvZ2dsZSBsb2dnZXJcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBFbmFibGUgb3IgZGlzYWJsZSBsb2dnZXIgYXBwbGljYXRpb24gd2lkZVxuICB8XG4gICovXG4gIGVuYWJsZWQ6IHRydWUsXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgTG9nZ2luZyBsZXZlbFxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IFRoZSBsZXZlbCBmcm9tIHdoaWNoIHlvdSB3YW50IHRoZSBsb2dnZXIgdG8gZmx1c2ggbG9ncy4gSXQgaXMgcmVjb21tZW5kZWRcbiAgfCB0byBtYWtlIHVzZSBvZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUsIHNvIHRoYXQgeW91IGNhbiBkZWZpbmUgbG9nIGxldmVsc1xuICB8IGF0IGRlcGxveW1lbnQgbGV2ZWwgYW5kIG5vdCBjb2RlIGxldmVsLlxuICB8XG4gICovXG4gIGxldmVsOiBFbnYuZ2V0KCdMT0dfTEVWRUwnLCAnaW5mbycpLFxuXG4gIC8qXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8IFByZXR0eSBwcmludFxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IEl0IGlzIGhpZ2hseSBhZHZpc2VkIE5PVCB0byB1c2UgYHByZXR0eVByaW50YCBpbiBwcm9kdWN0aW9uLCBzaW5jZSBpdFxuICB8IGNhbiBoYXZlIGh1Z2UgaW1wYWN0IG9uIHBlcmZvcm1hbmNlLlxuICB8XG4gICovXG4gIHByZXR0eVByaW50OiBFbnYuZ2V0KCdOT0RFX0VOVicpID09PSAnZGV2ZWxvcG1lbnQnLFxufVxuXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IFByb2ZpbGVyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiovXG5leHBvcnQgY29uc3QgcHJvZmlsZXI6IFByb2ZpbGVyQ29uZmlnID0ge1xuICAvKlxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfCBUb2dnbGUgcHJvZmlsZXJcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBFbmFibGUgb3IgZGlzYWJsZSBwcm9maWxlclxuICB8XG4gICovXG4gIGVuYWJsZWQ6IHRydWUsXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgQmxhY2tsaXN0IGFjdGlvbnMvcm93IGxhYmVsc1xuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IERlZmluZSBhbiBhcnJheSBvZiBhY3Rpb25zIG9yIHJvdyBsYWJlbHMgdGhhdCB5b3Ugd2FudCB0byBkaXNhYmxlIGZyb21cbiAgfCBnZXR0aW5nIHByb2ZpbGVkLlxuICB8XG4gICovXG4gIGJsYWNrbGlzdDogW10sXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgV2hpdGVsaXN0IGFjdGlvbnMvcm93IGxhYmVsc1xuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IERlZmluZSBhbiBhcnJheSBvZiBhY3Rpb25zIG9yIHJvdyBsYWJlbHMgdGhhdCB5b3Ugd2FudCB0byB3aGl0ZWxpc3QgZm9yXG4gIHwgdGhlIHByb2ZpbGVyLiBXaGVuIHdoaXRlbGlzdCBpcyBkZWZpbmVkLCB0aGVuIGBibGFja2xpc3RgIGlzIGlnbm9yZWQuXG4gIHxcbiAgKi9cbiAgd2hpdGVsaXN0OiBbXSxcbn1cblxuLypcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBWYWxpZGF0b3JcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufFxufCBDb25maWd1cmUgdGhlIGdsb2JhbCBjb25maWd1cmF0aW9uIGZvciB0aGUgdmFsaWRhdG9yLiBIZXJlJ3MgdGhlIHJlZmVyZW5jZVxufCB0byB0aGUgZGVmYXVsdCBjb25maWcgaHR0cHM6Ly9naXQuaW8vSlQwV0VcbnxcbiovXG5leHBvcnQgY29uc3QgdmFsaWRhdG9yOiBWYWxpZGF0b3JDb25maWcgPSB7XG59XG4iXX0=