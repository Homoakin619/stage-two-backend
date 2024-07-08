"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActions = void 0;
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UserActions {
    static async createUser(userCreationPayload) {
        const { createPayload, dbTransactionOptions } = userCreationPayload;
        const user = new User_1.default();
        user.fill(createPayload);
        if (dbTransactionOptions.useTransaction) {
            user.useTransaction(dbTransactionOptions.dbTransaction);
        }
        await user.save();
        return user;
    }
    static async getUserRecord(userRecordOptions) {
        const { identifier, identifierType } = userRecordOptions;
        const GetRecord = {
            id: async () => await this.getUserRecordById(Number(identifier)),
            userId: async () => await this.getUserRecordByUserId(String(identifier)),
            email: async () => await this.getUserRecordByEmail(String(identifier))
        };
        return await GetRecord[identifierType]();
    }
    static async getUserRecordById(identifier) {
        return User_1.default.query().where('id', identifier).first();
    }
    static async getUserRecordByUserId(identifier) {
        return User_1.default.query().where('userId', identifier).first();
    }
    static async getUserRecordByEmail(identifier) {
        return User_1.default.query().where('email', identifier).first();
    }
    static async getOrganisationUserRecord({ identifier, userId }) {
        const userOrganisationsIds = (await User_1.default.query().where('userId', userId).preload('organisations').first())?.organisations.map(organisation => organisation.id);
        return User_1.default.query()
            .where('userId', identifier)
            .whereHas('organisations', (query) => {
            query.whereIn("organisations.id", userOrganisationsIds);
        }).first();
    }
    static async fetchUserOrganisations(userId) {
        const user = await User_1.default.query().where("userId", userId).preload('organisations').first();
        const organisations = user.organisations.map(organisation => (organisation.forClient()));
        return organisations;
    }
}
exports.UserActions = UserActions;
//# sourceMappingURL=UserAction.js.map