/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent, Output } from '@bearer/core'
import '@bearer/ui'

// import the PullRequest type from the types.ts
import { PullRequest } from './types'

@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  // Output is named pullRequests and is an Array of PullRequest
  @Output() pullRequests: PullRequest[] = []

  // The action we are going to trigger when the scenario will be completed (last screen reached)
  attachPullRequest = ({ data, complete }): void => {
    this.pullRequests = [...this.pullRequests, data.pullRequest]
    complete()
  }

  render() {
    return (
      <div>
        <bearer-navigator
          btnProps={{ content: 'helloWorld', kind: 'primary' }}
          direction="right"
          complete={this.attachPullRequest}
        >
          <bearer-navigator-auth-screen />
          <bearer-navigator-screen navigationTitle="Repositories" name="repository">
            <list-repositories />
          </bearer-navigator-screen>
          <bearer-navigator-screen
            // data will be passed to list-pull-requests as 'this' keyword
            renderFunc={({ data }) => <list-pull-requests {...data} />}
            name="pullRequest"
            navigationTitle={data => data.repository.full_name}
          />
        </bearer-navigator>
      </div>
    )
  }
}
