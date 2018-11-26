/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent, Output, BearerRef } from '@bearer/core'
import '@bearer/ui'

import { PullRequest } from './types'

@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Output() pullRequests: BearerRef<PullRequest[]> = []

  save = () => {
    const count = this.pullRequests.length
    this.pullRequests = [
      ...this.pullRequests,
      {
        id: count + '',
        number: count + '',
        title: `PR: ${this.pullRequests.length}`,
        base: { repo: { full_name: 'node' } }
      }
    ]
  }
  render() {
    return (
      <bearer-navigator btnProps={{ content: 'Feature Action', kind: 'primary' }} direction="right">
        <bearer-navigator-auth-screen />
        <bearer-navigator-screen navigationTitle="My first screen">
          <button onClick={this.save} />
        </bearer-navigator-screen>
      </bearer-navigator>
    )
  }
}
