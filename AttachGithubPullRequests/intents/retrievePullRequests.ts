import { RetrieveState, TOAUTH2AuthContext, TRetrieveStateCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
// import Client from './client'
import { State } from '../views/types'
export default class RetrievePullRequestsIntent {
  static intentName: string = 'retrievePullRequests'
  static intentType: any = RetrieveState

  static action(_context: TOAUTH2AuthContext, _params: any, state: State, callback: TRetrieveStateCallback) {
    callback({ data: state.pullRequests || [] })
  }
}
