import { Component, Intent, BearerFetch } from '@bearer/core'

@Component({
  tag: 'list-repositories',
  styleUrl: 'ListRepositories.css',
  shadow: true
})
export class ListRepositories {
  @Intent('listRepositories') fetcher: BearerFetch
  render() {
    return (
      <bearer-scrollable
        fetcher={this.fetcher}
        perPage={10}
        renderCollection={collection => (
          <bearer-navigator-collection
            data={collection}
            renderFunc={repository => (
              <repository-item repository={repository} />
            )}
          />
        )}
      />
    )
  }
}
