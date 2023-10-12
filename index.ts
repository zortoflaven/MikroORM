import { EntityCaseNamingStrategy, MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import { User } from "./data/entity/User";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

async function test() {
  const orm = await MikroORM.init({
    type: "mysql",
    driver: MySqlDriver,
    highlighter: new SqlHighlighter(),
    namingStrategy: EntityCaseNamingStrategy,
    host: "localhost",
    dbName: "test",
    port: 3306,
    user: "testUser",
    password: "testP4$$word",
    entities: ["data/entity/*.ts"],
    entitiesTs: ["data/entity/*.ts"],
    migrations: {
      pathTs: "data/migration",
    },
  });

  await orm.migrator.up();

  const em = orm.em.fork();

  const uers = await em
    .createQueryBuilder(User)
    .select("*")
    .leftJoinAndSelect("workspaceRoles", "wsr")
    .leftJoinAndSelect("wsr.workspace", "ws")
    .leftJoinAndSelect("wsr.userRole", "role")
    .where({
      id: "445bff08-0258-45c4-98b8-a1b1b3997de5",
    })
    .execute("all");

  console.debug(JSON.stringify(uers));
}
test();
