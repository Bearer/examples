/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent, Output } from '@bearer/core'
import '@bearer/ui'

import { PullRequest } from './types'

@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Output() pullRequests: PullRequest[] = []
  attachPullRequest = ({ data, complete }): void => {
    // Use the savePullRequest intent to store the current state
    this.pullRequests = [...this.pullRequests, data.pullRequest]
    complete()
  }

  render() {
    return (
      <bearer-navigator
        btnProps={{ content: 'Feature Action', kind: 'primary' }}
        direction="right"
        complete={this.attachPullRequest}
      >
        <bearer-navigator-auth-screen />
        <bearer-navigator-screen navigationTitle="Repositories" name="repository">
          <repository-list />
        </bearer-navigator-screen>
        <bearer-navigator-screen
          renderFunc={({ data }) => <pull-request-list {...data} />}
          name="pullRequest"
          navigationTitle={data => data.repository.full_name}
        />
      </bearer-navigator>
    )
  }
}
