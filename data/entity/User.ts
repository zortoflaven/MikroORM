import {
  Entity,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { WorkspaceUser } from "./WorkspaceUser";

@Entity({ tableName: "user" })
export class User {
  [OptionalProps]?: "workspaceRoles";
  @PrimaryKey({
    defaultRaw: "(UUID())",
    length: 38,
    name: "idUser",
    type: "number",
  })
  id: string;

  @Unique()
  @Property({
    length: 255,
    type: "string",
  })
  Email: string;

  @OneToMany({ entity: () => WorkspaceUser, mappedBy: "user" })
  workspaceRoles: WorkspaceUser[] = [];
}
