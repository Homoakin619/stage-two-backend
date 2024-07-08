import { DateTime } from "luxon"

interface UserInterface  {
    id: number
    
    userId: string

    firstName: string

    lastName: string

    email: string

    phone: string

    password: string

    createdAt: DateTime

    updatedAt: DateTime

}

export default UserInterface