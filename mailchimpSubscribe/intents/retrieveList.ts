import { RetrieveState, TbasicAuthContext, TRetrieveStateCallback } from '@bearer/intents'
import Client from './client'

export default class retrieveListIntent {
  static intentName: string = 'retrieveList'
  static intentType: any = RetrieveState

  static action(context: TbasicAuthContext, _params: any, state, callback: TRetrieveStateCallback) {

    if (state.list.id){
      Client(
        context.authAccess.username,
        context.authAccess.password
      )
        .get(`lists/${state.list.id}`)
        .then(response => {
          console.log(response.data)
          callback({ data: response.data })
        })
        .catch(error => {
          console.log(error)
          callback({ error: error.response })
        })
    } else {
      callback({ data: {} })
    }

  }

}
