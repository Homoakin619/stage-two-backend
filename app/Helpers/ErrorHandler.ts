export default function processError(errors:{rule: string, field:string, message:string}[]) {
    return errors.map(error => ({field: error.field, message: error.message}))
}