import { FetchData, Toauth2Context, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class ListChannelsIntent {
  static intentName: string = 'ListChannels'
  static intentType: any = FetchData

  static action(context: Toauth2Context, _params: any, _body: any, callback: TFetchDataCallback) {
    const request = Client(context.authAccess.accessToken).get('channels.list')
    request
      .then(response => {
        if (response.data.ok) {
          callback({
            data: response.data.channels.map(({ id, name }) => ({ id, name }))
          })
        } else {
          callback({ error: `Error while fetching channels ${JSON.stringify(response.data)}` })
        }
      })
      .catch(e =>
        callback({
          error: e.toString()
        })
      )
  }
}
