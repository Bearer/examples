import { Component, BearerState, State, Intent, IntentType, Watch } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'display-attached-pull-requests',
  shadow: true
})
export class DisplayAttachedPullRequests {
  @State() loading: boolean = true
  // Connect retrievePullRequests Intent
  @Intent('retrievePullRequests', IntentType.RetrieveState) retrievePullRequests: any

  // Adding Watcher to handle referenceId changes
  @Watch('referenceId')
  handler() {
    this.componentDidLoad()
  }

  @BearerState({
    statePropName: 'attachedPullRequests'
  }) prs: Array<any> = []

  componentDidLoad() {
    this.loading = true
    // We use the Intent to retrieve the stored Pull Requests
    this.retrievePullRequests()
      .then(({ data }) => {
        if (data) {
          this.prs = data
        }
        this.loading = false
      })
      .catch(error => {
        console.error('Error while fetching', error)
        this.loading = false
      })
  }

  get hasAttachedPullRequest(): boolean {
    return Boolean(this.prs.length)
  }

  render() {
    if (this.loading) {
      return <bearer-loading />
    }
    const hasPrs = this.hasAttachedPullRequest
    return (
      <bearer-alert kind={hasPrs ? 'info' : 'secondary'}>
        {hasPrs && <ul>{this.prs.map(pr => <li>{pr.title}</li>)}</ul>}
        {!hasPrs && 'No Pull Request attached'}
      </bearer-alert>
    )
  }
}
