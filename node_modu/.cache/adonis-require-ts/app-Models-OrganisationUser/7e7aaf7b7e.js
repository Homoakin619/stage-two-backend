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
const AbstractBaseModel_1 = __importDefault(require("./AbstractBaseModel"));
class OrganisationUser extends AbstractBaseModel_1.default {
}
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], OrganisationUser.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], OrganisationUser.prototype, "orgId", void 0);
exports.default = OrganisationUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JnYW5pc2F0aW9uVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9yZ2FuaXNhdGlvblVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBOEM7QUFDOUMsNEVBQW1EO0FBRW5ELE1BQXFCLGdCQUFpQixTQUFRLDJCQUFpQjtDQU05RDtBQUpDO0lBREMsSUFBQSxZQUFNLEdBQUU7O2dEQUNZO0FBR3JCO0lBREMsSUFBQSxZQUFNLEdBQUU7OytDQUNXO0FBTHRCLG1DQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29sdW1uIH0gZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvT3JtJ1xuaW1wb3J0IEFic3RyYWN0QmFzZU1vZGVsIGZyb20gJy4vQWJzdHJhY3RCYXNlTW9kZWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZ2FuaXNhdGlvblVzZXIgZXh0ZW5kcyBBYnN0cmFjdEJhc2VNb2RlbCB7XG4gIEBjb2x1bW4oKVxuICBwdWJsaWMgdXNlcklkOiBudW1iZXJcblxuICBAY29sdW1uKClcbiAgcHVibGljIG9yZ0lkOiBudW1iZXJcbn1cbiJdfQ==