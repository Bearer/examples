/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  name: 'action',
  group: 'feature'
})
export class FeatureAction {
  render() {
    return (
      <bearer-navigator btnProps={ {content:"importlinkedin", kind:"primary"} } direction="right">
        <bearer-navigator-auth-screen />
        <bearer-navigator-screen navigationTitle="People" name="repository">
            <get-people />
          </bearer-navigator-screen>
      </bearer-navigator>
    )
  }
}
