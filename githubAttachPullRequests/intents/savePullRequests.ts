import { SaveState, TOAUTH2AuthContext, TSaveStateCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
// import Client from './client'
import { State, PullRequest } from '../views/types'

export default class SavePullRequestsIntent {
  static intentName: string = 'savePullRequests'
  static intentType: any = SaveState

  static action(
    _context: TOAUTH2AuthContext,
    _params: any,
    body: { pullRequests: PullRequest[] },
    state: State,
    callback: TSaveStateCallback
  ): void {
    const { pullRequests } = body
    callback({
      state: {
        ...state,
        pullRequests: pullRequests.map(pullRequest => ({
          number: pullRequest.number,
          fullName: pullRequest.base.repo.full_name
        }))
      },
      data: pullRequests
    })
  }
}
