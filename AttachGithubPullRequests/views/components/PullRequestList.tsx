import { BearerFetch, Component, Intent, Prop } from '@bearer/core'

@Component({
  tag: 'pull-request-list',
  shadow: true
})
export class PullRequestList {
  @Intent('PullRequestList') fetcher: BearerFetch
  @Prop() repository: any

  getPullRequest = (params = {}): Promise<any> => {
    return this.fetcher({ ...params, fullName: this.repository.full_name })
  }

  render() {
    return <bearer-scrollable fetcher={this.getPullRequest} rendererProps={{ displayMemberProp: 'title' }} />
  }
}
