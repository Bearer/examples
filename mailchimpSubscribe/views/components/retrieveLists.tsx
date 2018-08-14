import { Component, Intent, BearerFetch } from '@bearer/core'

@Component({
  tag: 'retrieve-lists',
  shadow: true
})
export class RetrieveLists {
  @Intent('retrieveLists') fetcher: BearerFetch

  render() {
    return <bearer-scrollable fetcher={this.fetcher} />
  }
}
