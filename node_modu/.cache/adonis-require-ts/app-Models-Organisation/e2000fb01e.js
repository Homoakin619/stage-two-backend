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
    __metadata("design:type", typeof (_a = typeof Orm_1.ManyToMany !== "undefined" && Orm_1.ManyToMany) === "function" ? _a : Object)
], Organisation.prototype, "users", void 0);
__decorate([
    (0, Orm_1.beforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Organisation]),
    __metadata("design:returntype", Promise)
], Organisation, "generateIdentifier", null);
exports.default = Organisation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JnYW5pc2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT3JnYW5pc2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUFvRjtBQUNwRix1RUFBK0M7QUFDL0MsNEVBQW1EO0FBQ25ELGtEQUF5QjtBQUV6QixNQUFxQixZQUFhLFNBQVEsMkJBQWlCO0lBb0JsRCxTQUFTO1FBQ2QsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFO1NBQ3BDLENBQUE7SUFDSCxDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFtQjtRQUN4RCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUEsY0FBSSxHQUFFLENBQUE7SUFDdEIsQ0FBQztDQUNGO0FBOUJDO0lBREMsSUFBQSxZQUFNLEdBQUU7OzJDQUNXO0FBR3BCO0lBREMsSUFBQSxZQUFNLEdBQUU7OzBDQUNVO0FBR25CO0lBREMsSUFBQSxZQUFNLEdBQUU7O2lEQUNpQjtBQVUxQjtJQVJDLElBQUEsZ0JBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxjQUFJLEVBQUU7UUFDdEIsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLGVBQWUsRUFBRSxRQUFRO1FBQ3pCLHNCQUFzQixFQUFFLFNBQVM7S0FFbEMsQ0FBQztrREFDWSxnQkFBVSxvQkFBVixnQkFBVTsyQ0FBYTtBQVdyQztJQURDLElBQUEsa0JBQVksR0FBRTs7cUNBQytCLFlBQVk7OzRDQUV6RDtBQS9CSCwrQkFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBiZWZvcmVDcmVhdGUsIGNvbHVtbiwgbWFueVRvTWFueSwgTWFueVRvTWFueSB9IGZyb20gJ0Bpb2M6QWRvbmlzL0x1Y2lkL09ybSdcbmltcG9ydCB7IGN1aWQgfSBmcm9tIFwiQGlvYzpBZG9uaXMvQ29yZS9IZWxwZXJzXCJcbmltcG9ydCBBYnN0cmFjdEJhc2VNb2RlbCBmcm9tICcuL0Fic3RyYWN0QmFzZU1vZGVsJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmdhbmlzYXRpb24gZXh0ZW5kcyBBYnN0cmFjdEJhc2VNb2RlbCB7XG4gIEBjb2x1bW4oKVxuICBwdWJsaWMgb3JnSWQ6IHN0cmluZ1xuXG4gIEBjb2x1bW4oKVxuICBwdWJsaWMgbmFtZTogc3RyaW5nXG5cbiAgQGNvbHVtbigpXG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nXG5cbiAgQG1hbnlUb01hbnkoKCkgPT4gVXNlciwge1xuICAgIHBpdm90VGFibGU6IFwib3JnYW5pc2F0aW9uX3VzZXJzXCIsXG4gICAgbG9jYWxLZXk6IFwiaWRcIixcbiAgICByZWxhdGVkS2V5OiBcImlkXCIsXG4gICAgcGl2b3RGb3JlaWduS2V5OiBcIm9yZ19pZFwiLFxuICAgIHBpdm90UmVsYXRlZEZvcmVpZ25LZXk6IFwidXNlcl9pZFwiXG5cbiAgfSlcbiAgcHVibGljIHVzZXJzOiBNYW55VG9NYW55PHR5cGVvZiBVc2VyPlxuXG4gIHB1YmxpYyBmb3JDbGllbnQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9yZ0lkOiB0aGlzLm9yZ0lkLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24gfHwgXCJcIlxuICAgIH1cbiAgfVxuXG4gIEBiZWZvcmVDcmVhdGUoKVxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGdlbmVyYXRlSWRlbnRpZmllcihtb2RlbDogT3JnYW5pc2F0aW9uKSB7XG4gICAgbW9kZWwub3JnSWQgPSBjdWlkKClcbiAgfVxufVxuIl19