import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class IncomeTransaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public transaction_date: DateTime;
  @column()
  public user_email: string;
  @column()
  public amount: number;
  @column()
  public income_category_id: number;
  @column()
  public description: string;
}
