import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm' 

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public phone: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true, prepare : ()=>DateTime.local().toUTC().toSQL().substr(0,19) })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, prepare : ()=>DateTime.local().toUTC().toSQL().substr(0,19) })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
   
    if(user.phone)
    {
      var number =  user.phone.split('-').join('-').split(' ').join(' ').split('+').join('-');
      if(number[0] == '0')
      {
        number = number.replace('0','62')
      }
      if(number[0] == '8')
      {
        number = number.replace('8','628')
      }
      user.phone = number;
    }
    
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
