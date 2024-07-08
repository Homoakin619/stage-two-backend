"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganisationActions = void 0;
const Organisation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Organisation"));
const OrganisationUser_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/OrganisationUser"));
class OrganisationActions {
    static async createOrganisation(organisationCreationPayload) {
        const { createPayload, dbTransactionOptions } = organisationCreationPayload;
        const organisation = new Organisation_1.default();
        organisation.fill(createPayload);
        if (dbTransactionOptions.useTransaction) {
            organisation.useTransaction(dbTransactionOptions.dbTransaction);
        }
        await organisation.save();
        return organisation;
    }
    static async getOrganisationRecord(organisationRecordOptions) {
        const { identifier, identifierType } = organisationRecordOptions;
        const GetRecord = {
            id: async () => await this.getOrganisationRecordById(Number(identifier)),
            orgId: async () => await this.getOrganisationRecordByOrganisationId(String(identifier)),
            name: async () => await this.getOrganisationRecordName(String(identifier))
        };
        return await GetRecord[identifierType]();
    }
    static async getOrganisationRecordById(identifier) {
        return Organisation_1.default.query().where('id', identifier).first();
    }
    static async getOrganisationRecordByOrganisationId(identifier) {
        return Organisation_1.default.query().where('orgId', identifier).first();
    }
    static async getOrganisationRecordName(identifier) {
        return Organisation_1.default.query().where('name', identifier).first();
    }
    static async addUserToOrganisation({ userId, orgId }) {
        const userOrganisationInstance = new OrganisationUser_1.default();
        userOrganisationInstance.fill({ userId, orgId });
        return await userOrganisationInstance.save();
    }
}
exports.OrganisationActions = OrganisationActions;
//# sourceMappingURL=OrganisationAction.js.map