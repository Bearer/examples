import { Component, Prop } from '@bearer/core'
import '@bearer/ui'
import { TPullRequest } from '../types'

@Component({
  tag: 'display-attached-pull-requests',
  shadow: true
})
export class DisplayAttachedPullRequests {
  @Prop()
  pullRequests: Array<TPullRequest>

  get hasAttachedPullRequest(): boolean {
    return Boolean(this.pullRequests.length)
  }

  render() {
    const hasPrs = this.hasAttachedPullRequest
    return (
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
