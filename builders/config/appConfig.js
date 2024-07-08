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
//# sourceMappingURL=appConfig.js.map