import { Component, Prop } from '@bearer/core'

import { PullRequest } from '../types'

@Component({
  tag: 'attached-pull-requests',
  styleUrl: 'AttachedPullRequests.css',
  shadow: true
})
export class AttachedPullRequests {
  @Prop() pullRequests: PullRequest[] = []

  render() {
    return (
      <ul>
        {this.pullRequests.map(pr => (
          <li>{pr.title}</li>
        ))}
      </ul>
    )
  }
}
