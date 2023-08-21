import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "savings_goals";

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
        .enu("status", ["in progress", "completed"])
        .defaultTo("in progress")
        .notNullable();
      table
        .integer("savings_category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("savings_categories");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
