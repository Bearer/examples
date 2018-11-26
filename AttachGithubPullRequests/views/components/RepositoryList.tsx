import { BearerFetch, Component, Intent } from '@bearer/core'

@Component({
  tag: 'repository-list',
  shadow: true
})
export class RepositoryList {
  @Intent('RepositoryList') fetcher: BearerFetch
  render() {
    return <bearer-scrollable fetcher={this.fetcher} />
  }
}