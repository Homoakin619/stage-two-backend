import Organisation from "App/Models/Organisation";
import OrganisationUser from "App/Models/OrganisationUser";
import CreateNewOrganisationRecordOptions from "App/TypeChecking/CreateNewOrganisationRecordOptions";
import OrganisationIdentifierOptions from "App/TypeChecking/Options/OrganisationIdentifierOptions";

export class OrganisationActions {
    public static async createOrganisation(organisationCreationPayload: CreateNewOrganisationRecordOptions) {
        const { createPayload, dbTransactionOptions } = organisationCreationPayload
        const organisation = new Organisation()

        organisation.fill(createPayload)

        if (dbTransactionOptions.useTransaction) {
            organisation.useTransaction(dbTransactionOptions.dbTransaction)
        }
        await organisation.save()

        return organisation
    }

    public static async getOrganisationRecord(organisationRecordOptions: OrganisationIdentifierOptions) {
        const { identifier, identifierType } = organisationRecordOptions
        
        const GetRecord = {
            id: async () => await this.getOrganisationRecordById(Number(identifier)),
            orgId: async () => await this.getOrganisationRecordByOrganisationId(String(identifier)),
            name: async () => await this.getOrganisationRecordName(String(identifier))
        }

        return await GetRecord[identifierType]()
    }

    private static async getOrganisationRecordById(identifier: number) {
        return Organisation.query().where('id', identifier).first()
    }

    private static async getOrganisationRecordByOrganisationId(identifier: string) {
        return Organisation.query().where('orgId', identifier).first()
    }

    private static async getOrganisationRecordName(identifier: string) {
        return Organisation.query().where('name', identifier).first()
    }

    public static async addUserToOrganisation({userId, orgId}: {userId: number, orgId: number}) {
        const userOrganisationInstance = new OrganisationUser()
        userOrganisationInstance.fill({userId,orgId})
        
        return await userOrganisationInstance.save()
    }

    
}