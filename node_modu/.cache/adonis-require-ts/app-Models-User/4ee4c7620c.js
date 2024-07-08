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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const AbstractBaseModel_1 = __importDefault(require("./AbstractBaseModel"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Organisation_1 = __importDefault(require("./Organisation"));
class User extends AbstractBaseModel_1.default {
    static async hashPassword(model) {
        model.password = await Hash_1.default.make(model.password);
    }
    static async generateIdentifier(model) {
        model.userId = (0, Helpers_1.cuid)();
    }
    forClient() {
        return {
            userId: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone
        };
    }
}
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Organisation_1.default, {
        pivotTable: "organisation_users",
        localKey: "id",
        relatedKey: "id",
        pivotForeignKey: "user_id",
        pivotRelatedForeignKey: "org_id"
    }),
    __metadata("design:type", typeof (_a = typeof Orm_1.ManyToMany !== "undefined" && Orm_1.ManyToMany) === "function" ? _a : Object)
], User.prototype, "organisations", void 0);
__decorate([
    (0, Orm_1.beforeSave)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
__decorate([
    (0, Orm_1.beforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "generateIdentifier", null);
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQWdHO0FBQ2hHLGtGQUF3QztBQUN4Qyw0RUFBbUQ7QUFDbkQsdUVBQStDO0FBQy9DLGtFQUF5QztBQUV6QyxNQUFxQixJQUFLLFNBQVEsMkJBQWlCO0lBc0IxQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFXO1FBQzFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxjQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFXO1FBQ2hELEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBQSxjQUFJLEdBQUUsQ0FBQTtJQUN2QixDQUFDO0lBWU0sU0FBUztRQUNkLE9BQU87WUFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUEvQ0M7SUFEQyxJQUFBLFlBQU0sR0FBRTs7b0NBQ1k7QUFHckI7SUFEQyxJQUFBLFlBQU0sR0FBRTs7dUNBQ2U7QUFHeEI7SUFEQyxJQUFBLFlBQU0sR0FBRTs7c0NBQ2M7QUFHdkI7SUFEQyxJQUFBLFlBQU0sR0FBRTs7bUNBQ1c7QUFHcEI7SUFEQyxJQUFBLFlBQU0sR0FBRTs7bUNBQ1c7QUFHcEI7SUFEQyxJQUFBLFlBQU0sR0FBRTs7c0NBQ2M7QUFxQnZCO0lBUkMsSUFBQSxnQkFBVSxFQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFZLEVBQUU7UUFDOUIsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLGVBQWUsRUFBRSxTQUFTO1FBQzFCLHNCQUFzQixFQUFFLFFBQVE7S0FFakMsQ0FBQztrREFDb0IsZ0JBQVUsb0JBQVYsZ0JBQVU7MkNBQXFCO0FBakJyRDtJQURDLElBQUEsZ0JBQVUsR0FBRTs7cUNBQzJCLElBQUk7OzhCQUUzQztBQUdEO0lBREMsSUFBQSxrQkFBWSxHQUFFOztxQ0FDK0IsSUFBSTs7b0NBRWpEO0FBN0JILHVCQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJlZm9yZUNyZWF0ZSwgYmVmb3JlU2F2ZSwgY29sdW1uLCBNYW55VG9NYW55LCBtYW55VG9NYW55IH0gZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvT3JtJ1xuaW1wb3J0IEhhc2ggZnJvbSBcIkBpb2M6QWRvbmlzL0NvcmUvSGFzaFwiXG5pbXBvcnQgQWJzdHJhY3RCYXNlTW9kZWwgZnJvbSAnLi9BYnN0cmFjdEJhc2VNb2RlbCdcbmltcG9ydCB7IGN1aWQgfSBmcm9tIFwiQGlvYzpBZG9uaXMvQ29yZS9IZWxwZXJzXCJcbmltcG9ydCBPcmdhbmlzYXRpb24gZnJvbSAnLi9PcmdhbmlzYXRpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBBYnN0cmFjdEJhc2VNb2RlbCB7XG5cbiAgQGNvbHVtbigpXG4gIHB1YmxpYyB1c2VySWQ6IHN0cmluZ1xuXG4gIEBjb2x1bW4oKVxuICBwdWJsaWMgZmlyc3ROYW1lOiBzdHJpbmdcblxuICBAY29sdW1uKClcbiAgcHVibGljIGxhc3ROYW1lOiBzdHJpbmdcblxuICBAY29sdW1uKClcbiAgcHVibGljIGVtYWlsOiBzdHJpbmdcblxuICBAY29sdW1uKClcbiAgcHVibGljIHBob25lOiBzdHJpbmdcblxuICBAY29sdW1uKClcbiAgcHVibGljIHBhc3N3b3JkOiBzdHJpbmdcblxuXG4gIEBiZWZvcmVTYXZlKClcbiAgcHVibGljIHN0YXRpYyBhc3luYyBoYXNoUGFzc3dvcmQobW9kZWw6IFVzZXIpIHtcbiAgICBtb2RlbC5wYXNzd29yZCA9IGF3YWl0IEhhc2gubWFrZShtb2RlbC5wYXNzd29yZClcbiAgfVxuXG4gIEBiZWZvcmVDcmVhdGUoKVxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGdlbmVyYXRlSWRlbnRpZmllcihtb2RlbDogVXNlcikge1xuICAgIG1vZGVsLnVzZXJJZCA9IGN1aWQoKVxuICB9XG5cbiAgQG1hbnlUb01hbnkoKCkgPT4gT3JnYW5pc2F0aW9uLCB7XG4gICAgcGl2b3RUYWJsZTogXCJvcmdhbmlzYXRpb25fdXNlcnNcIixcbiAgICBsb2NhbEtleTogXCJpZFwiLFxuICAgIHJlbGF0ZWRLZXk6IFwiaWRcIixcbiAgICBwaXZvdEZvcmVpZ25LZXk6IFwidXNlcl9pZFwiLFxuICAgIHBpdm90UmVsYXRlZEZvcmVpZ25LZXk6IFwib3JnX2lkXCJcblxuICB9KVxuICBwdWJsaWMgb3JnYW5pc2F0aW9uczogTWFueVRvTWFueTx0eXBlb2YgT3JnYW5pc2F0aW9uPlxuXG4gIHB1YmxpYyBmb3JDbGllbnQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgICBmaXJzdE5hbWU6IHRoaXMuZmlyc3ROYW1lLFxuICAgICAgbGFzdE5hbWU6IHRoaXMubGFzdE5hbWUsXG4gICAgICBlbWFpbDogdGhpcy5lbWFpbCxcbiAgICAgIHBob25lOiB0aGlzLnBob25lXG4gICAgfVxuICB9XG59XG4iXX0=