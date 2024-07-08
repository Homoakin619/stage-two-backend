"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const config_1 = require("@adonisjs/core/build/config");
exports.default = (0, config_1.hashConfig)({
    default: Env_1.default.get('HASH_DRIVER', 'scrypt'),
    list: {
        scrypt: {
            driver: 'scrypt',
            cost: 16384,
            blockSize: 8,
            parallelization: 1,
            saltSize: 16,
            keyLength: 64,
            maxMemory: 32 * 1024 * 1024,
        },
        argon: {
            driver: 'argon2',
            variant: 'id',
            iterations: 3,
            memory: 4096,
            parallelism: 1,
            saltSize: 16,
        },
        bcrypt: {
            driver: 'bcrypt',
            rounds: 10,
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFPQSxnRkFBc0M7QUFDdEMsd0RBQXdEO0FBV3hELGtCQUFlLElBQUEsbUJBQVUsRUFBQztJQVV4QixPQUFPLEVBQUUsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO0lBRXpDLElBQUksRUFBRTtRQWNKLE1BQU0sRUFBRTtZQUNOLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBRSxLQUFLO1lBQ1gsU0FBUyxFQUFFLENBQUM7WUFDWixlQUFlLEVBQUUsQ0FBQztZQUNsQixRQUFRLEVBQUUsRUFBRTtZQUNaLFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSTtTQUM1QjtRQWVELEtBQUssRUFBRTtZQUNMLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsVUFBVSxFQUFFLENBQUM7WUFDYixNQUFNLEVBQUUsSUFBSTtZQUNaLFdBQVcsRUFBRSxDQUFDO1lBQ2QsUUFBUSxFQUFFLEVBQUU7U0FDYjtRQWVELE1BQU0sRUFBRTtZQUNOLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE1BQU0sRUFBRSxFQUFFO1NBQ1g7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29uZmlnIHNvdXJjZTogaHR0cHM6Ly9naXQuaW8vSmZlZldcbiAqXG4gKiBGZWVsIGZyZWUgdG8gbGV0IHVzIGtub3cgdmlhIFBSLCBpZiB5b3UgZmluZCBzb21ldGhpbmcgYnJva2VuIGluIHRoaXMgY29uZmlnXG4gKiBmaWxlLlxuICovXG5cbmltcG9ydCBFbnYgZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9FbnYnXG5pbXBvcnQgeyBoYXNoQ29uZmlnIH0gZnJvbSAnQGFkb25pc2pzL2NvcmUvYnVpbGQvY29uZmlnJ1xuXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IEhhc2ggQ29uZmlnXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnxcbnwgVGhlIGBIYXNoQ29uZmlnYCByZWxpZXMgb24gdGhlIGBIYXNoTGlzdGAgaW50ZXJmYWNlIHdoaWNoIGlzXG58IGRlZmluZWQgaW5zaWRlIGBjb250cmFjdHNgIGRpcmVjdG9yeS5cbnxcbiovXG5leHBvcnQgZGVmYXVsdCBoYXNoQ29uZmlnKHtcbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgRGVmYXVsdCBoYXNoZXJcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBCeSBkZWZhdWx0IHdlIG1ha2UgdXNlIG9mIHRoZSBhcmdvbiBoYXNoZXIgdG8gaGFzaCB2YWx1ZXMuIEhvd2V2ZXIsIGZlZWxcbiAgfCBmcmVlIHRvIGNoYW5nZSB0aGUgZGVmYXVsdCB2YWx1ZVxuICB8XG4gICovXG4gIGRlZmF1bHQ6IEVudi5nZXQoJ0hBU0hfRFJJVkVSJywgJ3NjcnlwdCcpLFxuXG4gIGxpc3Q6IHtcbiAgICAvKlxuICAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHwgc2NyeXB0XG4gICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgfFxuICAgIHwgU2NyeXB0IG1hcHBpbmcgdXNlcyB0aGUgTm9kZS5qcyBpbmJ1aWx0IGNyeXB0byBtb2R1bGUgZm9yIGNyZWF0aW5nXG4gICAgfCBoYXNoZXMuXG4gICAgfFxuICAgIHwgV2UgYXJlIHVzaW5nIHRoZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gcmVjb21tZW5kZWQgd2l0aGluIHRoZSBOb2RlLmpzXG4gICAgfCBkb2N1bWVudGF0aW9uLlxuICAgIHwgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9jcnlwdG8uaHRtbCNjcnlwdG9zY3J5cHRwYXNzd29yZC1zYWx0LWtleWxlbi1vcHRpb25zLWNhbGxiYWNrXG4gICAgfFxuICAgICovXG4gICAgc2NyeXB0OiB7XG4gICAgICBkcml2ZXI6ICdzY3J5cHQnLFxuICAgICAgY29zdDogMTYzODQsXG4gICAgICBibG9ja1NpemU6IDgsXG4gICAgICBwYXJhbGxlbGl6YXRpb246IDEsXG4gICAgICBzYWx0U2l6ZTogMTYsXG4gICAgICBrZXlMZW5ndGg6IDY0LFxuICAgICAgbWF4TWVtb3J5OiAzMiAqIDEwMjQgKiAxMDI0LFxuICAgIH0sXG5cbiAgICAvKlxuICAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHwgQXJnb25cbiAgICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB8XG4gICAgfCBBcmdvbiBtYXBwaW5nIHVzZXMgdGhlIGBhcmdvbjJgIGRyaXZlciB0byBoYXNoIHZhbHVlcy5cbiAgICB8XG4gICAgfCBNYWtlIHN1cmUgeW91IGluc3RhbGwgdGhlIHVuZGVybHlpbmcgZGVwZW5kZW5jeSBmb3IgdGhpcyBkcml2ZXIgdG8gd29yay5cbiAgICB8IGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3BoYy1hcmdvbjIuXG4gICAgfFxuICAgIHwgbnBtIGluc3RhbGwgcGhjLWFyZ29uMlxuICAgIHxcbiAgICAqL1xuICAgIGFyZ29uOiB7XG4gICAgICBkcml2ZXI6ICdhcmdvbjInLFxuICAgICAgdmFyaWFudDogJ2lkJyxcbiAgICAgIGl0ZXJhdGlvbnM6IDMsXG4gICAgICBtZW1vcnk6IDQwOTYsXG4gICAgICBwYXJhbGxlbGlzbTogMSxcbiAgICAgIHNhbHRTaXplOiAxNixcbiAgICB9LFxuXG4gICAgLypcbiAgICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB8IEJjcnlwdFxuICAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHxcbiAgICB8IEJjcnlwdCBtYXBwaW5nIHVzZXMgdGhlIGBiY3J5cHRgIGRyaXZlciB0byBoYXNoIHZhbHVlcy5cbiAgICB8XG4gICAgfCBNYWtlIHN1cmUgeW91IGluc3RhbGwgdGhlIHVuZGVybHlpbmcgZGVwZW5kZW5jeSBmb3IgdGhpcyBkcml2ZXIgdG8gd29yay5cbiAgICB8IGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3BoYy1iY3J5cHQuXG4gICAgfFxuICAgIHwgbnBtIGluc3RhbGwgcGhjLWJjcnlwdFxuICAgIHxcbiAgICAqL1xuICAgIGJjcnlwdDoge1xuICAgICAgZHJpdmVyOiAnYmNyeXB0JyxcbiAgICAgIHJvdW5kczogMTAsXG4gICAgfSxcbiAgfSxcbn0pXG4iXX0=