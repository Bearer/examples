/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { RootComponent, State, Intent, IntentType, BearerFetch, BearerState, Watch } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  role: 'display',
  group: 'feature'
})
export class FeatureDisplay {
  @State() loading: boolean = false
  @Intent('RetrieveState', IntentType.RetrieveState) fetcher: BearerFetch
  @BearerState() profile: any

  @Watch('referenceId')
  handler() {
    this.componentDidLoad()
  }

  componentDidLoad() {
    this.loading = true
    this.fetcher()
      .then(({ data }) => {
        if (data) {
          this.profile = data.data
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
    if (!this.profile) {
      return <p>No profile description available.</p>
    }
    console.log(this.profile)
    return [
      <img src={this.profile.data[0].pictureUrls.values[0]} />,
      <h1>{this.profile.data[0].formattedName}</h1>,
      <h2>{this.profile.data[0].headline}</h2>,
      <p>{this.profile.data[0].summary}</p>
    ]
  }
}
