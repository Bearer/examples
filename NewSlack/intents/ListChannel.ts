import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'

export default class ListChannelIntent {
  static intentName: string = 'ListChannel'
  static intentType: any = FetchData

  static action(context: TOAUTH2AuthContext, params: any, body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken)
      .get('channels.list')
      .then(response => {
        if (response.data.ok) {
          callback({
            data: response.data.channels.map(({ id, name }) => ({ id, name }))
          })
        } else {
          callback({ error: `Error while fetching users ${JSON.stringify(response.data)}` })
        }
      })
      .catch(e => {
        console.log('[BEARER]', 'e', e)
        callback({
          error: e.toString()
        })
      })
  }
}
