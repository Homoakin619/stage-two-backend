type OrganisationIdentifierOptions = {
    identifier: string,
    identifierType: 'orgId'
} | {
    identifier: number,
    identifierType: 'id'
} | {
    identifier: string,
    identifierType: 'name'
}

export default OrganisationIdentifierOptions