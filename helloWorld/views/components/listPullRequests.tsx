import { BearerFetch, Component, Intent, Prop } from '@bearer/core'

@Component({
  tag: 'list-pull-requests',
  shadow: true
})
export class ListPullRequests {
  @Prop() repository: any
  @Intent('listPullRequests') fetcher: BearerFetch

  getPullRequest = (params = {}): Promise<any> => {
    return this.fetcher({ ...params, fullName: this.repository.full_name })
  }

  render() {
    return <bearer-scrollable fetcher={this.getPullRequest} rendererProps={{ displayMemberProp: 'title' }} />
  }
}
