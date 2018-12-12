/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { RootComponent, Input } from '@bearer/core'
import '@bearer/ui'

// We import the PullRequest type from types.ts
import { PullRequest } from './types'

@RootComponent({
  role: 'display',
  group: 'feature'
})
export class FeatureDisplay {
  // Input is named pullRequests and is an Array of PullRequest
  @Input() pullRequests: PullRequest[] = []

  render() {
    if (!this.pullRequests.length) {
      return <bearer-alert kind="info">No Pull Requests attached</bearer-alert>
    }

    return (
      <ul>
        {/* We loop over the pullRequests and we display the title */}
        {this.pullRequests.map(pr => (
          <li>{pr.title}</li>
        ))}
      </ul>
    )
  }
}
