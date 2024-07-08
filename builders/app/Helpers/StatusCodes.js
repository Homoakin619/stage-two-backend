"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCodeEnum = void 0;
var HttpStatusCodeEnum;
(function (HttpStatusCodeEnum) {
    HttpStatusCodeEnum[HttpStatusCodeEnum["CREATED"] = 201] = "CREATED";
    HttpStatusCodeEnum[HttpStatusCodeEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCodeEnum[HttpStatusCodeEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCodeEnum[HttpStatusCodeEnum["OK"] = 200] = "OK";
    HttpStatusCodeEnum[HttpStatusCodeEnum["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatusCodeEnum[HttpStatusCodeEnum["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatusCodeEnum[HttpStatusCodeEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
})(HttpStatusCodeEnum = exports.HttpStatusCodeEnum || (exports.HttpStatusCodeEnum = {}));
//# sourceMappingURL=StatusCodes.js.map