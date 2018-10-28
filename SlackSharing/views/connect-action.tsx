/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import Bearer, { RootComponent, Events, Event, EventEmitter } from '@bearer/core'
import '@bearer/ui'
import Slack from './components/SlackLogoColor'
import Cross from './components/IconCross'
import { TAuthSavedPayload } from './types'

export type TAuthorizedPayload = {
  authId: string
}

@RootComponent({
  role: 'action',
  group: 'connect',
  shadow: false
})
export class ConnectAction {
  @Event()
  authorized: EventEmitter<TAuthorizedPayload>

  componentDidLoad() {
    Bearer.emitter.addListener(Events.AUTHORIZED, ({ data }: { data: TAuthSavedPayload }) => {
      this.authorized.emit({ authId: data.authId })
    })
  }

  renderUnauthorized = ({ authenticate }) => (
    <bearer-button kind="light" onClick={authenticate}>
      <span class="root">
        <Slack />
        <span>Connect your Slack</span>
      </span>
    </bearer-button>
  )

  renderAuthorized = ({ revoke }) => (
    <bearer-button kind="danger" outline onClick={revoke}>
      <span class="root">
        <Cross />
        <span>Revoke access to your Slack</span>
      </span>
    </bearer-button>
  )

  render() {
    return <bearer-authorized renderUnauthorized={this.renderUnauthorized} renderAuthorized={this.renderAuthorized} />
  }
}
