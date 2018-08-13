import { RetrieveState, Toauth2Context, TRetrieveStateCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
// import Client from './client'

export default class RetrieveStateIntent {
  static intentName: string = 'RetrieveState'
  static intentType: any = RetrieveState

  
  static action(_context: Toauth2Context, _params: any, state, callback: TRetrieveStateCallback) {
    callback(state)
  }
  
}

