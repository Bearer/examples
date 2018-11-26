import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'

export default class RepositoryListIntent {
  static intentName: string = 'RepositoryList'
  static intentType: any = FetchData

  static action(context: TOAUTH2AuthContext, params: any, body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken)
      .get('user/repos')
      .then(({ data }) => {
        callback({ data })
      })
      .catch(error => {
        callback({ error: error.toString() })
      })
  }
}
