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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
class AbstractBaseModel extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], AbstractBaseModel.prototype, "id", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", typeof (_a = typeof luxon_1.DateTime !== "undefined" && luxon_1.DateTime) === "function" ? _a : Object)
], AbstractBaseModel.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", typeof (_b = typeof luxon_1.DateTime !== "undefined" && luxon_1.DateTime) === "function" ? _b : Object)
], AbstractBaseModel.prototype, "updatedAt", void 0);
exports.default = AbstractBaseModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RCYXNlTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBYnN0cmFjdEJhc2VNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBZ0M7QUFDaEMsZ0VBQXlEO0FBRXpELE1BQXFCLGlCQUFrQixTQUFRLGVBQVM7Q0FXdkQ7QUFUQztJQURDLElBQUEsWUFBTSxFQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDOzs2Q0FDWDtBQUlqQjtJQURDLFlBQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7a0RBQ3BCLGdCQUFRLG9CQUFSLGdCQUFRO29EQUFBO0FBRzFCO0lBREMsWUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO2tEQUN0QyxnQkFBUSxvQkFBUixnQkFBUTtvREFBQTtBQVQ1QixvQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nXG5pbXBvcnQgeyBCYXNlTW9kZWwsIGNvbHVtbiB9IGZyb20gJ0Bpb2M6QWRvbmlzL0x1Y2lkL09ybSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJzdHJhY3RCYXNlTW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICBAY29sdW1uKHsgaXNQcmltYXJ5OiB0cnVlIH0pXG4gIHB1YmxpYyBpZDogbnVtYmVyXG5cblxuICBAY29sdW1uLmRhdGVUaW1lKHsgYXV0b0NyZWF0ZTogdHJ1ZSB9KVxuICBwdWJsaWMgY3JlYXRlZEF0OiBEYXRlVGltZVxuXG4gIEBjb2x1bW4uZGF0ZVRpbWUoeyBhdXRvQ3JlYXRlOiB0cnVlLCBhdXRvVXBkYXRlOiB0cnVlIH0pXG4gIHB1YmxpYyB1cGRhdGVkQXQ6IERhdGVUaW1lXG5cbn1cbiJdfQ==