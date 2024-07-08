"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsConfig = {
    enabled: false,
    origin: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    headers: true,
    exposeHeaders: [
        'cache-control',
        'content-language',
        'content-type',
        'expires',
        'last-modified',
        'pragma',
    ],
    credentials: true,
    maxAge: 90,
};
exports.default = corsConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFTQSxNQUFNLFVBQVUsR0FBZTtJQWE3QixPQUFPLEVBQUUsS0FBSztJQXdCZCxNQUFNLEVBQUUsSUFBSTtJQVlaLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7SUFtQmpELE9BQU8sRUFBRSxJQUFJO0lBc0JiLGFBQWEsRUFBRTtRQUNiLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsY0FBYztRQUNkLFNBQVM7UUFDVCxlQUFlO1FBQ2YsUUFBUTtLQUNUO0lBYUQsV0FBVyxFQUFFLElBQUk7SUFXakIsTUFBTSxFQUFFLEVBQUU7Q0FDWCxDQUFBO0FBRUQsa0JBQWUsVUFBVSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb25maWcgc291cmNlOiBodHRwczovL2dpdC5pby9KZmVmQ1xuICpcbiAqIEZlZWwgZnJlZSB0byBsZXQgdXMga25vdyB2aWEgUFIsIGlmIHlvdSBmaW5kIHNvbWV0aGluZyBicm9rZW4gaW4gdGhpcyBjb25maWdcbiAqIGZpbGUuXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBDb3JzQ29uZmlnIH0gZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9Db3JzJ1xuXG5jb25zdCBjb3JzQ29uZmlnOiBDb3JzQ29uZmlnID0ge1xuICAvKlxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfCBFbmFibGVkXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8XG4gIHwgQSBib29sZWFuIHRvIGVuYWJsZSBvciBkaXNhYmxlIENPUlMgaW50ZWdyYXRpb24gZnJvbSB5b3VyIEFkb25pc0pzXG4gIHwgYXBwbGljYXRpb24uXG4gIHxcbiAgfCBTZXR0aW5nIHRoZSB2YWx1ZSB0byBgdHJ1ZWAgd2lsbCBlbmFibGUgdGhlIENPUlMgZm9yIGFsbCBIVFRQIHJlcXVlc3QuIEhvd2V2ZXIsXG4gIHwgeW91IGNhbiBkZWZpbmUgYSBmdW5jdGlvbiB0byBlbmFibGUvZGlzYWJsZSBpdCBvbiBwZXIgcmVxdWVzdCBiYXNpcyBhcyB3ZWxsLlxuICB8XG4gICovXG4gIGVuYWJsZWQ6IGZhbHNlLFxuXG4gIC8vIFlvdSBjYW4gYWxzbyB1c2UgYSBmdW5jdGlvbiB0aGF0IHJldHVybiB0cnVlIG9yIGZhbHNlLlxuICAvLyBlbmFibGVkOiAocmVxdWVzdCkgPT4gcmVxdWVzdC51cmwoKS5zdGFydHNXaXRoKCcvYXBpJylcblxuICAvKlxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfCBPcmlnaW5cbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBTZXQgYSBsaXN0IG9mIG9yaWdpbnMgdG8gYmUgYWxsb3dlZCBmb3IgYEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbmAuXG4gIHwgVGhlIHZhbHVlIGNhbiBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZzpcbiAgfFxuICB8IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvSGVhZGVycy9BY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cbiAgfFxuICB8IEJvb2xlYW4gKHRydWUpICAgIC0gQWxsb3cgY3VycmVudCByZXF1ZXN0IG9yaWdpbi5cbiAgfCBCb29sZWFuIChmYWxzZSkgICAtIERpc2FsbG93IGFsbC5cbiAgfCBTdHJpbmcgICAgICAgICAgICAtIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGFsbG93ZWQgb3JpZ2lucy5cbiAgfCBBcnJheSAgICAgICAgICAgICAtIEFuIGFycmF5IG9mIGFsbG93ZWQgb3JpZ2lucy5cbiAgfCBTdHJpbmcgKCopICAgICAgICAtIEEgd2lsZGNhcmQgKCopIHRvIGFsbG93IGFsbCByZXF1ZXN0IG9yaWdpbnMuXG4gIHwgRnVuY3Rpb24gICAgICAgICAgLSBSZWNlaXZlcyB0aGUgY3VycmVudCBvcmlnaW4gc3RyaW5nIGFuZCBzaG91bGQgcmV0dXJuXG4gIHwgICAgICAgICAgICAgICAgICAgICBvbmUgb2YgdGhlIGFib3ZlIHZhbHVlcy5cbiAgfFxuICAqL1xuICBvcmlnaW46IHRydWUsXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgTWV0aG9kc1xuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IEFuIGFycmF5IG9mIGFsbG93ZWQgSFRUUCBtZXRob2RzIGZvciBDT1JTLiBUaGUgYEFjY2Vzcy1Db250cm9sLVJlcXVlc3QtTWV0aG9kYFxuICB8IGlzIGNoZWNrZWQgYWdhaW5zdCB0aGUgZm9sbG93aW5nIGxpc3QuXG4gIHxcbiAgfCBGb2xsb3dpbmcgaXMgdGhlIGxpc3Qgb2YgZGVmYXVsdCBtZXRob2RzLiBGZWVsIGZyZWUgdG8gYWRkIG1vcmUuXG4gICovXG4gIG1ldGhvZHM6IFsnR0VUJywgJ0hFQUQnLCAnUE9TVCcsICdQVVQnLCAnREVMRVRFJ10sXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgSGVhZGVyc1xuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IExpc3Qgb2YgaGVhZGVycyB0byBiZSBhbGxvd2VkIGZvciBgQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVyc2AgaGVhZGVyLlxuICB8IFRoZSB2YWx1ZSBjYW4gYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gIHxcbiAgfCBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0hlYWRlcnMvQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzXG4gIHxcbiAgfCBCb29sZWFuKHRydWUpICAgICAtIEFsbG93IGFsbCBoZWFkZXJzIG1lbnRpb25lZCBpbiBgQWNjZXNzLUNvbnRyb2wtUmVxdWVzdC1IZWFkZXJzYC5cbiAgfCBCb29sZWFuKGZhbHNlKSAgICAtIERpc2FsbG93IGFsbCBoZWFkZXJzLlxuICB8IFN0cmluZyAgICAgICAgICAgIC0gQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgYWxsb3dlZCBoZWFkZXJzLlxuICB8IEFycmF5ICAgICAgICAgICAgIC0gQW4gYXJyYXkgb2YgYWxsb3dlZCBoZWFkZXJzLlxuICB8IEZ1bmN0aW9uICAgICAgICAgIC0gUmVjZWl2ZXMgdGhlIGN1cnJlbnQgaGVhZGVyIGFuZCBzaG91bGQgcmV0dXJuIG9uZSBvZiB0aGUgYWJvdmUgdmFsdWVzLlxuICB8XG4gICovXG4gIGhlYWRlcnM6IHRydWUsXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgRXhwb3NlIEhlYWRlcnNcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBBIGxpc3Qgb2YgaGVhZGVycyB0byBiZSBleHBvc2VkIGJ5IHNldHRpbmcgYEFjY2Vzcy1Db250cm9sLUV4cG9zZS1IZWFkZXJzYC5cbiAgfCBoZWFkZXIuIEJ5IGRlZmF1bHQgZm9sbG93aW5nIDYgc2ltcGxlIHJlc3BvbnNlIGhlYWRlcnMgYXJlIGV4cG9zZWQuXG4gIHxcbiAgfCBDYWNoZS1Db250cm9sXG4gIHwgQ29udGVudC1MYW5ndWFnZVxuICB8IENvbnRlbnQtVHlwZVxuICB8IEV4cGlyZXNcbiAgfCBMYXN0LU1vZGlmaWVkXG4gIHwgUHJhZ21hXG4gIHxcbiAgfCBJbiBvcmRlciB0byBhZGQgbW9yZSBoZWFkZXJzLCBzaW1wbHkgZGVmaW5lIHRoZW0gaW5zaWRlIHRoZSBmb2xsb3dpbmcgYXJyYXkuXG4gIHxcbiAgfCBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0hlYWRlcnMvQWNjZXNzLUNvbnRyb2wtRXhwb3NlLUhlYWRlcnNcbiAgfFxuICAqL1xuICBleHBvc2VIZWFkZXJzOiBbXG4gICAgJ2NhY2hlLWNvbnRyb2wnLFxuICAgICdjb250ZW50LWxhbmd1YWdlJyxcbiAgICAnY29udGVudC10eXBlJyxcbiAgICAnZXhwaXJlcycsXG4gICAgJ2xhc3QtbW9kaWZpZWQnLFxuICAgICdwcmFnbWEnLFxuICBdLFxuXG4gIC8qXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8IENyZWRlbnRpYWxzXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8XG4gIHwgVG9nZ2xlIGBBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc2AgaGVhZGVyLiBJZiB2YWx1ZSBpcyBzZXQgdG8gYHRydWVgLFxuICB8IHRoZW4gaGVhZGVyIHdpbGwgYmUgc2V0LCBvdGhlcndpc2Ugbm90LlxuICB8XG4gIHwgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9IZWFkZXJzL0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXG4gIHxcbiAgKi9cbiAgY3JlZGVudGlhbHM6IHRydWUsXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgTWF4QWdlXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8XG4gIHwgRGVmaW5lIGBBY2Nlc3MtQ29udHJvbC1NYXgtQWdlYCBoZWFkZXIgaW4gc2Vjb25kcy5cbiAgfCBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0hlYWRlcnMvQWNjZXNzLUNvbnRyb2wtTWF4LUFnZVxuICB8XG4gICovXG4gIG1heEFnZTogOTAsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvcnNDb25maWdcbiJdfQ==