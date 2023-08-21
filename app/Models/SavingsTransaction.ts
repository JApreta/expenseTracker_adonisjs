import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import SavingsGoal from "./SavingsGoal";

export default class SavingsTransaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public transaction_date: DateTime;
  @column()
  public amount: number;
  @column()
  public savings_goal_id: number;

  @column()
  public description: string;

  @belongsTo(() => SavingsGoal, {
    localKey: "savings_goal_id",
  })
  public savings_goal: BelongsTo<typeof SavingsGoal>;
}
