import { RetrieveState, Toauth2Context, TRetrieveStateCallback } from '@bearer/intents'
import Client from './client'

export default class RetrievePullRequests {
  static intentName: string = 'retrievePullRequests'
  static intentType: any = RetrieveState

  static action(context: Toauth2Context, _params: any, state, callback: TRetrieveStateCallback) {
    // Create a fetcher to retrieve all the information through GitHub API
    const pullRequestFetcher = (savedPR: any): Promise<any> =>
      Client(context.authAccess.accessToken)
        .get(`repos/${savedPR.fullName}/pulls/${savedPR.number}`)
        .then(response => response.data)
        .catch(error => ({ error: error.response }))

    // Loop over the PullRequests stored in the SaveState intent
    // Then query the GitHub API
    Promise.all(
      (state.pullRequests || [])
      .map(pullRequestFetcher)
    )
    .then(pullRequests => {
    	callback({ data: pullRequests })
    })
  }

}
