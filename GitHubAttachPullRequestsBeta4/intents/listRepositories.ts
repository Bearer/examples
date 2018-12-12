import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class ListRepositoriesIntent {
  static intentName: string = 'listRepositories'
  static intentType: any = FetchData

  static action(context: TOAUTH2AuthContext, _params: any, _body: any, callback: TFetchDataCallback) {
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
