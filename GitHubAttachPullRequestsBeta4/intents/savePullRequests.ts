import { SaveState, TOAUTH2AuthContext, TSaveStateCallback } from '@bearer/intents'

// We import the PullRequest type
import { PullRequest } from '../views/types'

export default class SavePullRequestsIntent {
  static intentName: string = 'savePullRequests'
  static intentType: any = SaveState

  static action(
    _context: TOAUTH2AuthContext,
    _params: any,
    body: { pullRequests: PullRequest[] }, // We define the structure of the body we will receive
    state: any,
    callback: TSaveStateCallback
  ): void {
    const { pullRequests } = body
    callback({
      state: {
        ...state,
        // We only store the required information in order to query it again
        pullRequests: pullRequests.map(pullRequest => ({
          number: pullRequest.number,
          fullName: pullRequest.base.repo.full_name
        }))
      },
      // we return the untouched dataset
      data: pullRequests
    })
  }
}
