import { SaveState, Toauth2Context, TSaveStateCallback } from '@bearer/intents'

export default class SavePullRequestIntent {
  static intentName: string = 'savePullRequest'
  static intentType: any = SaveState

  static action(
    _context: Toauth2Context,
    _params: any,
    body: { pullRequest: any, repository: any }, // We define the structure of the body we are going to receive
    state: any,
    callback: TSaveStateCallback
  ){
    callback({
      state: {
        ...state,
          // We append the pullRequest we want to attach to the existing pullRequests
        pullRequests: [
          ...(state.pullRequests || []),
          {
            number: body.pullRequest.number,
            fullName: body.repository.full_name
          }
        ]
      }
    })
  }

}
