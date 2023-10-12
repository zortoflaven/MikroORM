import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { UserRoleEnum } from "../index";

@Entity({ tableName: "userroles" })
export class UserRole {
  @PrimaryKey({
    name: "UserRole",
    fieldName: "userRole",
    length: 45,
  })
  UserRole: UserRoleEnum;

  @Property({
    fieldName: "level",
    columnType: "TINYINT",
    type: "number",
  })
  Level: number;
}
