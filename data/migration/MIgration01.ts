import { Migration } from "@mikro-orm/migrations";

export class Migration01 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `userroles` (`userRole` varchar(45) not null, `level` TINYINT not null, primary key (`userRole`)) default character set utf8mb4 engine = InnoDB;"
    );

    this.addSql(
      "create table `user` (`idUser` varchar(38) not null default (UUID()), `Email` varchar(255) not null, primary key (`idUser`)) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql("alter table `user` add unique `user_Email_unique`(`Email`);");

    this.addSql(
      "create table `workspace` (`idWorkspace` varchar(38) not null default (UUID()), `orgName` varchar(45) not null, primary key (`idWorkspace`)) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql(
      "alter table `workspace` add unique `workspace_orgName_unique`(`orgName`);"
    );

    this.addSql(
      "create table `workspaceuser` (`idUser` varchar(38) not null, `idWorkspace` varchar(38) not null, `userRole` varchar(45) not null, primary key (`idUser`, `idWorkspace`)) default character set utf8mb4 engine = InnoDB;"
    );
    this.addSql(
      "alter table `workspaceuser` add index `workspaceuser_idUser_index`(`idUser`);"
    );
    this.addSql(
      "alter table `workspaceuser` add index `workspaceuser_idWorkspace_index`(`idWorkspace`);"
    );
    this.addSql(
      "alter table `workspaceuser` add index `workspaceuser_userRole_index`(`userRole`);"
    );

    this.addSql(
      "alter table `workspaceuser` add constraint `workspaceuser_idUser_foreign` foreign key (`idUser`) references `user` (`idUser`) on update CASCADE on delete CASCADE;"
    );
    this.addSql(
      "alter table `workspaceuser` add constraint `workspaceuser_idWorkspace_foreign` foreign key (`idWorkspace`) references `workspace` (`idWorkspace`) on update CASCADE on delete CASCADE;"
    );
    this.addSql(
      "alter table `workspaceuser` add constraint `workspaceuser_userRole_foreign` foreign key (`userRole`) references `userroles` (`userRole`) on update CASCADE on delete RESTRICT;"
    );

    //Insert some data here
    this.addSql("INSERT INTO `userroles` VALUES ('Admin', '1');");
    this.addSql("INSERT INTO `userroles` VALUES ('Data Manager', '2');");
    this.addSql("INSERT INTO `userroles` VALUES ('Data Entry', '3');");

    this.addSql(
      "INSERT INTO `user` VALUES ('445bff08-0258-45c4-98b8-a1b1b3997de5', 'test@test.com');"
    );

    this.addSql(
      "INSERT INTO `workspace` VALUES ('8724b13e-9472-462f-b4be-927dc06f11fe', 'Test');"
    );
    this.addSql(
      "INSERT INTO `workspace` VALUES ('d278edec-97fc-4a7c-9999-df0b28967dba', 'Test2');"
    );

    this.addSql(
      "INSERT INTO `workspaceuser` VALUES ('445bff08-0258-45c4-98b8-a1b1b3997de5', '8724b13e-9472-462f-b4be-927dc06f11fe', 'Admin');"
    );
    this.addSql(
      "INSERT INTO `workspaceuser` VALUES ('445bff08-0258-45c4-98b8-a1b1b3997de5', 'd278edec-97fc-4a7c-9999-df0b28967dba', 'Admin');"
    );
  }

  async down(): Promise<void> {}
}
