import CreateNewRecordGeneric from "./CreateNewRecordGeneric";
import OrganisationInterface from "App/TypeChecking/Interface/OrganisationInterface";


type NewOrganisationRecordType = Pick<OrganisationInterface, 'name' | 'description'>

type CreateNewOrganisationRecordOptions = CreateNewRecordGeneric<NewOrganisationRecordType>

export default CreateNewOrganisationRecordOptions