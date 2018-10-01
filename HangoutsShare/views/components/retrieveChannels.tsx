import { BearerFetch, Component, Intent } from '@bearer/core'

@Component({
  tag: 'retrieve-channels',
  shadow: true
})
export class RetrieveChannels {
  @Intent('ListChannel')
  fetcher: BearerFetch

  renderItem = ({ name }: { name: string }) => `#${name}`

  render() {
    return (
      <bearer-scrollable
        fetcher={this.fetcher}
        renderCollection={collection => <bearer-navigator-collection data={collection} renderFunc={this.renderItem} />}
      />
    )
  }
}
