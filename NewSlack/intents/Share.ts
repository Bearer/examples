import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class ShareIntent {
  static intentName: string = 'Share'
  static intentType: any = FetchData

  static action(context: TOAUTH2AuthContext, params: any, body: any, callback: TFetchDataCallback) {
    console.log("Share context: ", context)
    Client(context.authAccess.accessToken)
      .get(`/channels.info?channel=${context.channel.id}`).then(({ data }) => {
        callback({ data })
      })
      .catch((error) => {
        callback({ error: error.toString() })
      })
  }
}
