import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'
// temporary
type TBody = {
  what: string
  who?: string
  when: string
}

const ME = 'me'

export default class CreateReminderIntent {
  static intentName: string = 'CreateReminder'
  static intentType: any = FetchData

  static action(context: TOAUTH2AuthContext, params: any, body: TBody, callback: TFetchDataCallback) {
    const { what, who = ME, when } = body
    Client(context.authAccess.accessToken)
      .post('reminders.add', {
        text: what,
        time: when,
        user: who === ME ? null : who
      })
      .then(response => {
        console.log('response status', response.status)
        console.log('response data', JSON.stringify(response.data))
        callback({
          data: response.data
        })
      })
      .catch(e =>
        callback({
          data: e.response
        })
      )
  }
}
