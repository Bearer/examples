/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import {
  Component,
  State,
  Prop,
  IntentType,
  BearerFetch,
  Intent,
  BearerComponent
} from '@bearer/core'
import '@bearer/ui'

import { PR } from './types.d'
import BearerState, { PromisifiedStore } from './BearerStateDecorator'
import mapper from './containers/attach-pull-request-display'

@BearerComponent
@Component({
  tag: 'attach-pull-request-display',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestDisplay {
  @Prop() bearerId: string
  @State() loading: boolean = true
  @BearerState store: PromisifiedStore
  @State() pullRequests: Array<PR> = []
  @State() detachPullRequest: (pullRequest) => Function
  @State() fetchState: () => Promise<any>

  @Intent('getPullRequest', IntentType.GetResource)
  fetcher: BearerFetch

  getPullRequest = ({ fullName, number }) =>
    this.fetcher({ fullName, id: number })
      .then(({ object: pullRequest }) => pullRequest)
      .catch(e => console.log(e))

  componentDidLoad() {
    this.store.then(store => {
      mapper(store, this)
      this.loading = true
      this.fetchState()
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    })
  }

  handleRemoveClick = pullRequest => {
    this.detachPullRequest(pullRequest)
  }

  render() {
    if (this.loading) {
      return <bearer-loading />
    }
    if (this.pullRequests.length === 0) {
      return <slot name="empty">No PR attached yet</slot>
    }
    return this.pullRequests.map(pr => (
      <attached-pull-request-item
        pullRequest={pr}
        onRemove={this.handleRemoveClick}
      />
    ))
  }
}
