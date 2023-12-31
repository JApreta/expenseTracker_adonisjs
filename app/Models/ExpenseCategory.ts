//import { DateTime } from 'luxon'
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ExpenseCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: String;
}
