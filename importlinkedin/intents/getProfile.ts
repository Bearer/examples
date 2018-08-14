import { FetchData, Toauth2Context, TFetchDataCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'

export default class getProfileIntent {
  static intentName: string = 'getProfile'
  static intentType: any = FetchData

  
  static action(context: Toauth2Context, params: any, body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken).get('/v1/people/~:(id,headline,summary,picture-urls::(original),public-profile-url,formatted-name)', {params: { format: 'json' }})
      .then(response => {
        callback({ data: [response.data] })
      })
      .catch(error => {
      	callback({ error: error.toString() })
      })
  }
}

