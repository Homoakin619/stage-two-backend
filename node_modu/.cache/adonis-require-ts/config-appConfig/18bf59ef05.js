"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const appConfig = {
    tokenExpiryTimeFrame: Env_1.default.get("ACCESS_TOKEN_EXPIRY_TIMEFRAME")
};
exports.default = appConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0ZBQXNDO0FBQ3RDLE1BQU0sU0FBUyxHQUFHO0lBQ2Qsb0JBQW9CLEVBQUcsYUFBRyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQztDQUNsRSxDQUFBO0FBRUQsa0JBQWUsU0FBUyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVudiBmcm9tIFwiQGlvYzpBZG9uaXMvQ29yZS9FbnZcIlxuY29uc3QgYXBwQ29uZmlnID0ge1xuICAgIHRva2VuRXhwaXJ5VGltZUZyYW1lIDogRW52LmdldChcIkFDQ0VTU19UT0tFTl9FWFBJUllfVElNRUZSQU1FXCIpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcENvbmZpZyJdfQ==