import CreateNewRecordGeneric from "./CreateNewRecordGeneric";
import UserInterface from "App/TypeChecking/Interface/UserInterface";


type NewUserRecordType = Pick<UserInterface, 'email' | 'password' | 'firstName' | 'lastName' | 'phone'  >

type CreateNewUserRecordOptions = CreateNewRecordGeneric<NewUserRecordType>

export default CreateNewUserRecordOptions