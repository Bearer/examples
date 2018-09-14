/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent, Intent, IntentType, BearerFetch, BearerState } from '@bearer/core'
import '@bearer/ui'
import { Profile } from './components/profile'

@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Intent('SaveState', IntentType.SaveState)
  saveFetcher: any
  @Intent('getProfile') profileFetcher: BearerFetch
  @BearerState() profile: Profile

  attachProfile = ({ complete }): void => {
    this.profileFetcher().then(data => {
      this.saveFetcher({ body: data[0] })
      .then(() => {
        console.log(data)
        this.profile = data
        complete()
      })
      .catch(error => {
        throw error
      })
    })
  }

  render() {
    return (
      <bearer-navigator btnProps={ {content:"Profile Page", kind:"primary"} } direction="right" complete={this.attachProfile}>
        <bearer-navigator-auth-screen />
        {/* <bearer-navigator-screen navigationTitle="Profile Page" name="profile">
          <get-profile />
        </bearer-navigator-screen> */}
      </bearer-navigator>
    )
  }
}
