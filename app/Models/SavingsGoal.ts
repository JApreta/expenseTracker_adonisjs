//import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import SavingsTransaction from "./SavingsTransaction";
import SavingsCategory from "./SavingsCategory";

export default class SavingsGoal extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_email: string;

  @column()
  public amount: number;

  @column()
  public savings_category_id: number;

  @column()
  public status: string;

  @column()
  public description: string;

  @hasMany(() => SavingsTransaction, {
    foreignKey: "savings_goal_id",
  })
  public savingsTransactions: HasMany<typeof SavingsTransaction>;

  @belongsTo(() => SavingsCategory, {
    localKey: "savings_category_id",
  })
  public savings_category: BelongsTo<typeof SavingsCategory>;
}
