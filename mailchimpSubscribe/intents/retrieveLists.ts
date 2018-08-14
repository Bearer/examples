import { FetchData, TbasicAuthContext, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class retrieveListsIntent {
  static intentName: string = 'retrieveLists'
  static intentType: any = FetchData


  static action(context: TbasicAuthContext, params: any, body: any, callback: TFetchDataCallback) {
    Client(
      context.authAccess.username,
      context.authAccess.password
    ).get('/lists').then(({ data }) => {
        callback({data: data.lists})
      })
      .catch((error) => {
        callback({ error: error.toString() })
      })
  }

}
