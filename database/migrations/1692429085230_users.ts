import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("first_name", 50).notNullable();
      table.string("last_name", 50).notNullable();
      table.string("user_email", 100).notNullable().primary();
      table.string("password").notNullable();
      table.string("remember_me_token").nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
