import { FetchData, Toauth2Context, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class ListPullRequestsIntent {
  static intentName: string = 'listPullRequests'
  static intentType: any = FetchData

  static action(context: Toauth2Context, params: any, body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken).get(`/repos/${params.fullName}/pulls`, {
      params: { per_page:10, ...params },
    })
      .then(({ data }) => {
        callback({ data })
      })
      .catch(error => {
        callback({ error: error.toString() })
      })
  }
}
