import { BearerFetch, Component, Intent } from '@bearer/core'

@Component({
  tag: 'list-calendars',
  shadow: true
})
export class ListCalendars {
  @Intent('GetCalendarsList') fetcher: BearerFetch
  render() {
    return <bearer-scrollable fetcher={this.fetcher} rendererProps={{ displayMemberProp: 'summary' }} />
  }
}
