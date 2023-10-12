import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";

@Entity({ tableName: "workspace" })
export class Workspace {
  @PrimaryKey({
    fieldName: "idWorkspace",
    length: 38,
    defaultRaw: "(UUID())",
    type: "string",
  })
  id: string;

  @Unique()
  @Property({
    length: 45,
    type: "string",
    fieldName: "orgName",
  })
  orgName: string;
}
