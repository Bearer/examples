import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class GetCalendarsListIntent {
  static intentName: string = 'GetCalendarsList'
  static intentType: any = FetchData


  static action(context: TOAUTH2AuthContext, params: any, body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken).get('users/me/calendarList').then(({ data }) => {
        callback({ data: data.items })
      })
      .catch((error) => {
        callback({ error: error.toString() })
      })
  }
}
