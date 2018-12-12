import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class ListPullRequestsIntent {
  static intentName: string = 'listPullRequests'
  static intentType: any = FetchData

  static action(context: TOAUTH2AuthContext, params: any, _body: any, callback: TFetchDataCallback) {
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
