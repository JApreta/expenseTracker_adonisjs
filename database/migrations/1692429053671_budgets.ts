import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "budgets";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .string("user_email")
        .notNullable()
        .references("user_email")
        .inTable("users");
      table.decimal("amount", 10, 2).notNullable();
      table.integer("month").unsigned().defaultTo(1).notNullable();
      table.integer("year").unsigned().notNullable();
      table
        .integer("expense_category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("expense_categories");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
