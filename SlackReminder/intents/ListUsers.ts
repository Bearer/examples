import { FetchData, Toauth2Context, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class ListUsersIntent {
  static intentName: string = 'ListUsers'
  static intentType: any = FetchData

  static action(context: Toauth2Context, _params: any, _body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken)
      .get('users.list')
      .then(response => {
        if (response.data.ok) {
          callback({
            data: response.data.members.map(({ id, name }) => ({ id, name }))
          })
        } else {
          callback({ error: `Error while fetching users ${JSON.stringify(response.data)}` })
        }
      })
      .catch(e => {
        console.log('[BEARER]', 'e', e)
        callback({
          error: e.toString()
        })
      })
  }
}
