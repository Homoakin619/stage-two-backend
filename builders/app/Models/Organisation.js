"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const AbstractBaseModel_1 = __importDefault(require("./AbstractBaseModel"));
const User_1 = __importDefault(require("./User"));
class Organisation extends AbstractBaseModel_1.default {
    forClient() {
        return {
            orgId: this.orgId,
            name: this.name,
            description: this.description || ""
        };
    }
    static async generateIdentifier(model) {
        model.orgId = (0, Helpers_1.cuid)();
    }
}
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Organisation.prototype, "orgId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Organisation.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Organisation.prototype, "description", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => User_1.default, {
        pivotTable: "organisation_users",
        localKey: "id",
        relatedKey: "id",
        pivotForeignKey: "org_id",
        pivotRelatedForeignKey: "user_id"
    }),
    __metadata("design:type", Object)
], Organisation.prototype, "users", void 0);
__decorate([
    (0, Orm_1.beforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Organisation]),
    __metadata("design:returntype", Promise)
], Organisation, "generateIdentifier", null);
exports.default = Organisation;
//# sourceMappingURL=Organisation.js.map