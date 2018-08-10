import { FetchData, Toauth2Context, TFetchDataCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'

export default class getProfileIntent {
  static intentName: string = 'getProfile'
  static intentType: any = FetchData

  
  static action(context: Toauth2Context, params: any, body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken).get('user/repos')
      .then(({ data }) => {
        callback({ data })
      })
      .catch(error => {
      	callback({ error: error.toString() })
      })
  }
}

