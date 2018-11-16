import { RootComponent, Input } from '@bearer/core'
import '@bearer/ui'

import { PullRequest } from './types'

@RootComponent({
  role: 'display',
  group: 'feature'
})
export class FeatureDisplay {
  @Input({
    intentName: 'retrievePullRequests'
  })
  pullRequests: Array<PullRequest> = []

  render() {
    const hasPrs = !!this.pullRequests.length

    return (
      // Add the referenceId
      // <display-attached-pull-requests referenceId={this.referenceId} />
      <bearer-alert kind={hasPrs ? 'info' : 'secondary'}>
        {hasPrs && (
          <ul>
            {this.pullRequests.map(pr => (
              <li>{pr.title}</li>
            ))}
          </ul>
        )}
        {!hasPrs && 'No Pull Request attached'}
      </bearer-alert>
    )
  }
}
