import { FetchData, Toauth2Context, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class subscribeUserIntent {
  static intentName: string = 'subscribeUser'
  static intentType: any = FetchData


  static action(context: Toauth2Context, params: any, _body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.username, context.authAccess.password).post('/lists/c57d2d24df/members', {
      status: "subscribed", ...params
    })
      .then(({ data }) => {
        callback({ data })
      })
      .catch(error => {
        callback({ error: error.response.data })
      })
  }

}
