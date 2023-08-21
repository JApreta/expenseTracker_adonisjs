//import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import SavingsGoal from "./SavingsGoal";

export default class SavingsCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @hasMany(() => SavingsGoal, {
    foreignKey: "savings_category_id",
  })
  public savingsGoals: HasMany<typeof SavingsGoal>;
}
