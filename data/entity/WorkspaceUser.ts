import { Entity, ManyToOne } from "@mikro-orm/core";
import { User } from "./User";
import { Workspace } from "./Workspace";
import { UserRoleEnum } from "../index";
import { UserRole } from "./UserRole";

@Entity({ tableName: "workspaceuser" })
export class WorkspaceUser {
  @ManyToOne({
    entity: () => User,
    primary: true,
    fieldName: "idUser",
    onUpdateIntegrity: "CASCADE",
    onDelete: "CASCADE",
  })
  user: string | User;

  @ManyToOne({
    entity: () => Workspace,
    primary: true,
    fieldName: "idWorkspace",
    onUpdateIntegrity: "CASCADE",
    onDelete: "CASCADE",
  })
  workspace: string | Workspace;

  @ManyToOne({
    entity: () => UserRole,
    fieldName: "userRole",
    onUpdateIntegrity: "CASCADE",
    onDelete: "RESTRICT",
  })
  userRole: UserRoleEnum | UserRole;
}
