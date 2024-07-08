type UserIdentifierOptions = {
    identifier: string,
    identifierType: 'userId'
} | {
    identifier: number,
    identifierType: 'id'
} | {
    identifier: string,
    identifierType: 'email'
}

export default UserIdentifierOptions