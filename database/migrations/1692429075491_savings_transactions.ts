import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "savings_transactions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.decimal("amount", 10, 2).notNullable();
      table.date("transaction_date").notNullable().defaultTo({ useTz: true });
      table.string("description").notNullable();
      table
        .integer("savings_goal_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("savings_goals");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
