import { RootComponent, Intent, BearerState, IntentType } from '@bearer/core'
import '@bearer/ui'

import { Output, BearerRef, TPullRequest } from './types'

@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Output()
  pullRequests: BearerRef<Array<TPullRequest>>
  // Connect savePullRequest Intent
  @Intent('savePullRequest', IntentType.SaveState)
  savePullRequest: any

  attachPullRequest = ({ data, complete }): void => {
    // Use the savePullRequest intent to store the current state
    this.savePullRequest({ body: data })
      .then(() => {
        this.pullRequests = [...this.pullRequests, data.pullRequest]
        complete()
      })
      .catch(error => {
        throw error
      })
  }

  render() {
    return (
      <bearer-navigator
        btnProps={{ content: 'Attach Pull Request', kind: 'primary' }}
        direction="right"
        complete={this.attachPullRequest}
      >
        <bearer-navigator-auth-screen />
        <bearer-navigator-screen navigationTitle="Repositories" name="repository">
          <list-repositories />
        </bearer-navigator-screen>
        <bearer-navigator-screen
          renderFunc={({ data }) => <list-pull-requests {...data} />}
          name="pullRequest"
          navigationTitle={data => data.repository.full_name}
        />
      </bearer-navigator>
    )
  }
}
