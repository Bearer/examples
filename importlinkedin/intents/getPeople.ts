import { FetchData, Toauth2Context, TFetchDataCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'

export default class getPeopleIntent {
  static intentName: string = 'getProfile'
  static intentType: any = FetchData

  
  static action(context: Toauth2Context, params: any, body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken).get('/v1/people/~', { headers: {"x-li-format":"json"}, params: { format: 'json' }})
      .then(response => {
        if (response.data.ok) {
          callback({
            data: response.data
          })
        } else {
          callback({ error: `Error while fetching users ${JSON.stringify(response.data)}` })
        }
      })
      .catch(error => {
      	callback({ error: error.toString() })
      })
  }
}

