import { FetchData, Toauth2Context, TFetchDataCallback, DBClient } from '@bearer/intents'
import Client from './client'

export default class subscribeUserIntent {
  static intentName: string = 'subscribeUser'
  static intentType: any = FetchData

  static action(context: Toauth2Context, params: any, _body: any, callback: TFetchDataCallback) {

    DBClient().getData(params.referenceId)
      .then( data => {
        Client(context.authAccess.username, context.authAccess.password).post(`/lists/${data.Item.list.id}/members`, {
          status: "subscribed", ...params
        })
          .then(({ data }) => {
            callback({ data })
          })
          .catch(error => {
            callback({ error: error.response.data })
          })
      })
      .catch( error => {
        callback({ error: error.toString() })
      })

  }
}
