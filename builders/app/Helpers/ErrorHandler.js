"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function processError(errors) {
    return errors.map(error => ({ field: error.field, message: error.message }));
}
exports.default = processError;
//# sourceMappingURL=ErrorHandler.js.map