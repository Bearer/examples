import { Component, Intent, BearerFetch, State } from '@bearer/core'
import { Profile } from './profile'

@Component({
  tag: 'get-profile',
  styleUrl: 'getProfile.css',
  shadow: true
})
export class GetProfile {
  @Intent('getProfile') fetcher: BearerFetch
  @State() profile: Profile
  @State() loading: boolean = true

  componentDidLoad() {
    this.loading = true
    this.fetcher()
      .then(({ data }) => {
        if (data) {
          this.profile = data[0]
        }
        this.loading = false
      })
      .catch(error => {
        console.error('Error while fetching', error)
        this.loading = false
      })
  }

  render() {
    if (this.loading) {
      return <bearer-loading />
    }
    return <bearer-button kind="success">Show Profile</bearer-button>
    // return <bearer-scrollable fetcher={this.fetcher} rendererProps={{ displayMemberProp: 'formattedName' }} />
  }
}
