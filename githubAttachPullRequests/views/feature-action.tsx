import { RootComponent, Intent, BearerState, IntentType } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  name: 'action',
  group: 'feature'
})
export class FeatureAction {
  // Connect savePullRequest Intent
  @Intent('savePullRequest', IntentType.SaveState) savePullRequest: any
  @BearerState() attachedPullRequests: Array<any> = []

  attachPullRequest = ({ data, complete }): void => {
    // Use the savePullRequest intent to store the current state
    this.savePullRequest({ body: data })
      .then(() => {
        this.attachedPullRequests = [...this.attachedPullRequests, data.pullRequest]
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
