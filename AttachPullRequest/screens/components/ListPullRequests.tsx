import {
  Component,
  Prop,
  BearerComponent,
  Intent,
  BearerFetch
} from '@bearer/core'

@BearerComponent
@Component({
  tag: 'list-pull-requests',
  styleUrl: 'ListPullRequests.css',
  shadow: true
})
export class ListPullRequests {
  @Intent('listPullRequests') fetcher: BearerFetch
  @Prop() repository: any

  renderCollection = collection => {
    return (
      <bearer-navigator-collection
        data={collection}
        renderFunc={this.renderFunc}
      />
    )
  }

  renderFunc = item => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '4px', position: 'relative' }}>
          <pull-request-icon />
        </span>

        {item.title}
      </span>
    )
  }

  getPullRequests = () => {
    const fullName = this.repository.full_name
    return this.fetcher({ fullName })
  }

  render() {
    return (
      <bearer-scrollable
        fetcher={this.getPullRequests}
        renderCollection={this.renderCollection}
      />
    )
  }
}
