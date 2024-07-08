import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database"

type CreateNewRecordGeneric<NewRecordPayload> = {
    createPayload: NewRecordPayload,
    dbTransactionOptions: {
        useTransaction: true
        dbTransaction: TransactionClientContract
    } | {
        useTransaction: false
    }
}

export default CreateNewRecordGeneric