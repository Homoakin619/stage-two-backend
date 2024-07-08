import User from "App/Models/User";
import CreateNewUserRecordOptions from "App/TypeChecking/CreateNewUserRecordOptions";
import UserIdentifierOptions from "App/TypeChecking/Options/UserIdentifierOptions";

export class UserActions {
    public static async createUser(userCreationPayload: CreateNewUserRecordOptions) {
        const { createPayload, dbTransactionOptions } = userCreationPayload
        const user = new User()
        user.fill(createPayload)

        if (dbTransactionOptions.useTransaction) {
            user.useTransaction(dbTransactionOptions.dbTransaction)
        }
        await user.save()

        return user
    }

    public static async getUserRecord(userRecordOptions: UserIdentifierOptions) {
        const { identifier, identifierType } = userRecordOptions
        
        const GetRecord = {
            id: async () => await this.getUserRecordById(Number(identifier)),
            userId: async () => await this.getUserRecordByUserId(String(identifier)),
            email: async () => await this.getUserRecordByEmail(String(identifier))
        }

        return await GetRecord[identifierType]()
    }

    private static async getUserRecordById(identifier: number) {
        return User.query().where('id', identifier).first()
    }

    private static async getUserRecordByUserId(identifier: string) {
        return User.query().where('userId', identifier).first()
    }

    private static async getUserRecordByEmail(identifier: string) {
        return User.query().where('email', identifier).first()
    }
    
    public static async getOrganisationUserRecord({identifier, userId}:{identifier: string, userId: string}) {

        const userOrganisationsIds = (await User.query().where('userId', userId).preload('organisations').first())?.organisations.map(organisation => organisation.id)!

        return User.query()
                    .where('userId',identifier)
                    .whereHas('organisations', (query) => {
                        query.whereIn("organisations.id",userOrganisationsIds)
                    }).first()

    }

    public static async fetchUserOrganisations(userId: string) {
        const user = await User.query().where("userId",userId).preload('organisations').first();
        const organisations = user!.organisations.map(organisation => (organisation.forClient()))
        return organisations
    }


}