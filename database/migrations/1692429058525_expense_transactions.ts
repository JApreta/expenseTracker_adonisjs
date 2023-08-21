import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "expense_transactions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .string("user_email")
        .notNullable()
        .references("user_email")
        .inTable("users");
      table.decimal("amount", 10, 2).notNullable();
      table.date("transaction_date").notNullable().defaultTo({ useTz: true });
      table.string("description").notNullable();
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
