import { RetrieveState, TOAUTH2AuthContext, TRetrieveStateCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
import Client from './client'
import { State } from '../views/types'

export default class RetrievePullRequestsIntent {
  static intentName: string = 'retrievePullRequests'
  static intentType: any = RetrieveState

  static action(context: TOAUTH2AuthContext, _params: any, state: State, callback: TRetrieveStateCallback) {
    // Create a fetcher to retrieve all the information through GitHub API
    const pullRequestFetcher = (savedPR: any): Promise<any> =>
      Client(context.authAccess.accessToken)
        .get(`repos/${savedPR.fullName}/pulls/${savedPR.number}`)
        .then(response => response.data)
        .catch(error => ({ error: error.response }))

    // Loop over the PullRequests stored in the SaveState intent
    // Then query the GitHub API
    Promise.all((state.pullRequests || []).map(pullRequestFetcher)).then(pullRequests => {
      callback({ data: pullRequests })
    })
  }
}
