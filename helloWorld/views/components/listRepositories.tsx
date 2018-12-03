import { BearerFetch, Component, Intent } from '@bearer/core'

@Component({
  tag: 'list-repositories',
  shadow: true
})
export class ListRepositories {
  @Intent('listRepositories') fetcher: BearerFetch
  render() {
    return <bearer-scrollable fetcher={this.fetcher} />
  }
}