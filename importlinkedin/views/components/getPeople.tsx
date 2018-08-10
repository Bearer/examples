import { Component, Intent, BearerFetch } from '@bearer/core'

@Component({
  tag: 'get-people',
  styleUrl: 'getPeople.css',
  shadow: true
})
export class GetPeople {
  @Intent('getPeople') fetcher: BearerFetch
  render() {
    return <bearer-scrollable fetcher={this.fetcher} />
  }
}