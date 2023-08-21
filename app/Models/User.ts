//import { DateTime } from 'luxon'
import Hash from "@ioc:Adonis/Core/Hash";
import { BaseModel, beforeSave, column } from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public user_email: string;

  @column({ serializeAs: null })
  public password: string;
  @column()
  public first_name: string;
  @column()
  public last_name: string;

  @column()
  public remember_me_token?: string;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
