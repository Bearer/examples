/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  role: 'action',
  group: 'connect'
})
export class ConnectAction {
  render() {
    return (
      <bearer-navigator btnProps={{ content: 'Connect Action', kind: 'primary' }} direction="right">
        <bearer-navigator-auth-screen />
      </bearer-navigator>
    )
  }
}
