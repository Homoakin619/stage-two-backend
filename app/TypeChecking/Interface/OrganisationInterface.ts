import { DateTime } from "luxon"

interface OrganisationInterface  {
    id: number
    
    orgId: string

    name: string

    description: string

    createdAt: DateTime

    updatedAt: DateTime

}

export default OrganisationInterface