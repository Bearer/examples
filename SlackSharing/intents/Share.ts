import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

type TShareParams = {
  channelId: string
  authId: string
}

export default class ShareIntent {
  static intentName: string = 'Share'
  static intentType: any = FetchData

  static action(context: TOAUTH2AuthContext, params: TShareParams, body: any, callback: TFetchDataCallback) {
    console.log(context)
    console.log(params)
    const channel = context.channel || body.channel
    try {
      if (!channel) {
        throw new MissingChannel()
      }
      if (!body.message) {
        throw new MissingMessage()
      }

      Client(context.authAccess.accessToken)
        .post(`chat.postMessage`, {
          channel: channel.id,
          text: body.message,
          as_user: false,
          parse: 'full'
        })
        .then(({ data }) => {
          if (data.ok) {
            callback({ data })
          } else {
            callback({ data })
          }
        })
        .catch(error => {
          callback({ error: error.toString() })
        })
    } catch (error) {
      callback({ error: error.toString() })
    }
  }
}

class MissingChannel extends Error {
  constructor() {
    super()
    this.name = 'MissingChannel'
    this.message = 'No channel present'
  }
}

class MissingMessage extends Error {
  constructor() {
    super()
    this.name = 'MissingMessage'
    this.message = 'No message to share'
  }
}
