import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "user_expense_categories";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .string("user_email")
        .notNullable()
        .references("user_email")
        .inTable("users");
      table
        .integer("expense_categoy_id")
        .notNullable()
        .references("id")
        .inTable("expense_categories");
      table.primary(["user_email", "expense_categoy_id"]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
