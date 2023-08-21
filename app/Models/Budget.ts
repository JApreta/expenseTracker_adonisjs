//import { DateTime } from 'luxon'
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Budget extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public user_email: string;
  @column()
  public amount: number;
  @column()
  public expense_category_id: number;
  @column()
  public month: number;
  @column()
  public year: number;
}
