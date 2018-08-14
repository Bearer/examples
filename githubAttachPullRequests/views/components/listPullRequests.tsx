import { Component, Intent, BearerFetch, Prop } from '@bearer/core'

@Component({
  tag: 'list-pull-requests',
  shadow: true
})
export class ListPullRequests {
  @Intent('listPullRequests') fetcher: BearerFetch
  @Prop() repository: any

  getPullRequest = (params = {}): Promise<any> => {
    return this.fetcher({ ...params, fullName: this.repository.full_name })
  }

  render() {
    return <bearer-scrollable fetcher={this.getPullRequest} rendererProps={{ displayMemberProp: 'title' }} />
  }
}
