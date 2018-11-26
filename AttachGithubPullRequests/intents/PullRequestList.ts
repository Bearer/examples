import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'

export type TParams = {
  fullName: string
}

export default class PullRequestListIntent {
  static intentName: string = 'PullRequestList'
  static intentType: any = FetchData

  static action(context: TOAUTH2AuthContext, params: TParams, _body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken)
      .get(`/repos/${params.fullName}/pulls`, {
        params: { per_page: 10, ...params }
      })
      .then(({ data }) => {
        callback({ data })
      })
      .catch(error => {
        callback({ error: error.toString() })
      })
  }
}
