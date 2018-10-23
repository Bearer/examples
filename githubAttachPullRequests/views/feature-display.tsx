import { RootComponent, State } from '@bearer/core'
import '@bearer/ui'
import { Input, BearerRef, TPullRequest } from './types'

@RootComponent({
  role: 'display',
  group: 'feature'
})
export class FeatureDisplay {
  @Input()
  pullRequests: BearerRef<Array<TPullRequest>>
  @State()
  loading = false

  render() {
    if (this.loading) {
      return <bearer-loading />
    }
    return (
      // Add the referenceId
      <display-attached-pull-requests pullRequests={this.pullRequests} />
    )
  }
}
