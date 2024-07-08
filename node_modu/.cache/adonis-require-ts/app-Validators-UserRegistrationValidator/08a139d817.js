"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UserRegistrationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true, escape: true }, [Validator_1.rules.unique({
                    table: "users",
                    column: "email"
                })]),
            firstName: Validator_1.schema.string({ trim: true, escape: true }),
            lastName: Validator_1.schema.string({ trim: true, escape: true }),
            password: Validator_1.schema.string({ trim: true, escape: true }),
            phone: Validator_1.schema.string({ trim: true, escape: true }, [Validator_1.rules.minLength(8)]),
        });
        this.messages = {
            "email.required": "Email field is required",
            "email.string": "Enter a valid email address",
            "firstName.required": "Firstname field is required",
            "firstName.string": "Enter a valid firstname",
            "lastName.required": "lastname field is required",
            "lastName.string": "Enter a valid lastname",
            "phone.required": "Phone field is required",
            "phone.string": "Enter a valid phone",
            "password.required": "Password field is required",
            "password.string": "Password field should be alphanumeric"
        };
    }
}
exports.default = UserRegistrationValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJlZ2lzdHJhdGlvblZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXJSZWdpc3RyYXRpb25WYWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyRUFBeUU7QUFHekUsTUFBcUIseUJBQXlCO0lBQzVDLFlBQXNCLEdBQXdCO1FBQXhCLFFBQUcsR0FBSCxHQUFHLENBQXFCO1FBcUJ2QyxXQUFNLEdBQUcsa0JBQU0sQ0FBQyxNQUFNLENBQUM7WUFDNUIsS0FBSyxFQUFFLGtCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEVBQUMsQ0FBQyxpQkFBSyxDQUFDLE1BQU0sQ0FBQztvQkFDNUQsS0FBSyxFQUFFLE9BQU87b0JBQ2QsTUFBTSxFQUFFLE9BQU87aUJBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ0YsU0FBUyxFQUFFLGtCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDcEQsUUFBUSxFQUFFLGtCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDbkQsUUFBUSxFQUFFLGtCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDbkQsS0FBSyxFQUFFLGtCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLEVBQUMsQ0FBQyxpQkFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RFLENBQUMsQ0FBQTtRQWFLLGFBQVEsR0FBbUI7WUFDaEMsZ0JBQWdCLEVBQUUseUJBQXlCO1lBQzNDLGNBQWMsRUFBRSw2QkFBNkI7WUFDN0Msb0JBQW9CLEVBQUUsNkJBQTZCO1lBQ25ELGtCQUFrQixFQUFFLHlCQUF5QjtZQUM3QyxtQkFBbUIsRUFBRSw0QkFBNEI7WUFDakQsaUJBQWlCLEVBQUUsd0JBQXdCO1lBQzNDLGdCQUFnQixFQUFFLHlCQUF5QjtZQUMzQyxjQUFjLEVBQUUscUJBQXFCO1lBQ3JDLG1CQUFtQixFQUFFLDRCQUE0QjtZQUNqRCxpQkFBaUIsRUFBRSx1Q0FBdUM7U0FDM0QsQ0FBQTtJQXREZ0QsQ0FBQztDQXVEbkQ7QUF4REQsNENBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2NoZW1hLCBDdXN0b21NZXNzYWdlcyxydWxlcyB9IGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvVmFsaWRhdG9yJ1xuaW1wb3J0IHR5cGUgeyBIdHRwQ29udGV4dENvbnRyYWN0IH0gZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9IdHRwQ29udGV4dCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlclJlZ2lzdHJhdGlvblZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjdHg6IEh0dHBDb250ZXh0Q29udHJhY3QpIHt9XG5cbiAgLypcbiAgICogRGVmaW5lIHNjaGVtYSB0byB2YWxpZGF0ZSB0aGUgXCJzaGFwZVwiLCBcInR5cGVcIiwgXCJmb3JtYXR0aW5nXCIgYW5kIFwiaW50ZWdyaXR5XCIgb2YgZGF0YS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGU6XG4gICAqIDEuIFRoZSB1c2VybmFtZSBtdXN0IGJlIG9mIGRhdGEgdHlwZSBzdHJpbmcuIEJ1dCB0aGVuIGFsc28sIGl0IHNob3VsZFxuICAgKiAgICBub3QgY29udGFpbiBzcGVjaWFsIGNoYXJhY3RlcnMgb3IgbnVtYmVycy5cbiAgICogICAgYGBgXG4gICAqICAgICBzY2hlbWEuc3RyaW5nKFsgcnVsZXMuYWxwaGEoKSBdKVxuICAgKiAgICBgYGBcbiAgICpcbiAgICogMi4gVGhlIGVtYWlsIG11c3QgYmUgb2YgZGF0YSB0eXBlIHN0cmluZywgZm9ybWF0dGVkIGFzIGEgdmFsaWRcbiAgICogICAgZW1haWwuIEJ1dCBhbHNvLCBub3QgdXNlZCBieSBhbnkgb3RoZXIgdXNlci5cbiAgICogICAgYGBgXG4gICAqICAgICBzY2hlbWEuc3RyaW5nKFtcbiAgICogICAgICAgcnVsZXMuZW1haWwoKSxcbiAgICogICAgICAgcnVsZXMudW5pcXVlKHsgdGFibGU6ICd1c2VycycsIGNvbHVtbjogJ2VtYWlsJyB9KSxcbiAgICogICAgIF0pXG4gICAqICAgIGBgYFxuICAgKi9cbiAgcHVibGljIHNjaGVtYSA9IHNjaGVtYS5jcmVhdGUoe1xuICAgIGVtYWlsOiBzY2hlbWEuc3RyaW5nKHt0cmltOiB0cnVlLCBlc2NhcGU6IHRydWV9LFtydWxlcy51bmlxdWUoe1xuICAgICAgdGFibGU6IFwidXNlcnNcIixcbiAgICAgIGNvbHVtbjogXCJlbWFpbFwiXG4gIH0pXSksXG4gICAgZmlyc3ROYW1lOiBzY2hlbWEuc3RyaW5nKHt0cmltOiB0cnVlLCBlc2NhcGU6IHRydWV9KSxcbiAgICBsYXN0TmFtZTogc2NoZW1hLnN0cmluZyh7dHJpbTogdHJ1ZSwgZXNjYXBlOiB0cnVlfSksXG4gICAgcGFzc3dvcmQ6IHNjaGVtYS5zdHJpbmcoe3RyaW06IHRydWUsIGVzY2FwZTogdHJ1ZX0pLFxuICAgIHBob25lOiBzY2hlbWEuc3RyaW5nKHt0cmltOiB0cnVlLCBlc2NhcGU6IHRydWV9LFtydWxlcy5taW5MZW5ndGgoOCldKSxcbiAgfSlcblxuICAvKipcbiAgICogQ3VzdG9tIG1lc3NhZ2VzIGZvciB2YWxpZGF0aW9uIGZhaWx1cmVzLiBZb3UgY2FuIG1ha2UgdXNlIG9mIGRvdCBub3RhdGlvbiBgKC4pYFxuICAgKiBmb3IgdGFyZ2V0aW5nIG5lc3RlZCBmaWVsZHMgYW5kIGFycmF5IGV4cHJlc3Npb25zIGAoKilgIGZvciB0YXJnZXRpbmcgYWxsXG4gICAqIGNoaWxkcmVuIG9mIGFuIGFycmF5LiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICoge1xuICAgKiAgICdwcm9maWxlLnVzZXJuYW1lLnJlcXVpcmVkJzogJ1VzZXJuYW1lIGlzIHJlcXVpcmVkJyxcbiAgICogICAnc2NvcmVzLioubnVtYmVyJzogJ0RlZmluZSBzY29yZXMgYXMgdmFsaWQgbnVtYmVycydcbiAgICogfVxuICAgKlxuICAgKi9cbiAgcHVibGljIG1lc3NhZ2VzOiBDdXN0b21NZXNzYWdlcyA9IHtcbiAgICBcImVtYWlsLnJlcXVpcmVkXCI6IFwiRW1haWwgZmllbGQgaXMgcmVxdWlyZWRcIixcbiAgICBcImVtYWlsLnN0cmluZ1wiOiBcIkVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzc1wiLFxuICAgIFwiZmlyc3ROYW1lLnJlcXVpcmVkXCI6IFwiRmlyc3RuYW1lIGZpZWxkIGlzIHJlcXVpcmVkXCIsXG4gICAgXCJmaXJzdE5hbWUuc3RyaW5nXCI6IFwiRW50ZXIgYSB2YWxpZCBmaXJzdG5hbWVcIixcbiAgICBcImxhc3ROYW1lLnJlcXVpcmVkXCI6IFwibGFzdG5hbWUgZmllbGQgaXMgcmVxdWlyZWRcIixcbiAgICBcImxhc3ROYW1lLnN0cmluZ1wiOiBcIkVudGVyIGEgdmFsaWQgbGFzdG5hbWVcIixcbiAgICBcInBob25lLnJlcXVpcmVkXCI6IFwiUGhvbmUgZmllbGQgaXMgcmVxdWlyZWRcIixcbiAgICBcInBob25lLnN0cmluZ1wiOiBcIkVudGVyIGEgdmFsaWQgcGhvbmVcIixcbiAgICBcInBhc3N3b3JkLnJlcXVpcmVkXCI6IFwiUGFzc3dvcmQgZmllbGQgaXMgcmVxdWlyZWRcIixcbiAgICBcInBhc3N3b3JkLnN0cmluZ1wiOiBcIlBhc3N3b3JkIGZpZWxkIHNob3VsZCBiZSBhbHBoYW51bWVyaWNcIlxuICB9XG59XG4iXX0=