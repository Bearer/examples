import { SaveState, Toauth2Context, TSaveStateCallback } from '@bearer/intents'
import { PullRequest } from '../views/types'

export default class SavePullRequestIntent {
  static intentName: string = 'savePullRequests'
  static intentType: any = SaveState

  static action(
    _context: Toauth2Context,
    _params: any,
    { pullRequests }: { pullRequests: Array<PullRequest> }, // We define the structure of the body we are going to receive
    state: any,
    callback: TSaveStateCallback
  ) {
    const newPullRequest = pullRequests[pullRequests.length - 1]
    callback({
      state: {
        ...state,
        // We append the pullRequest we want to attach to the existing pullRequests
        pullRequests: [
          ...(state.pullRequests || []),
          {
            number: newPullRequest.number,
            fullName: newPullRequest.base.repo.full_name
          }
        ]
      }
    })
  }
}
