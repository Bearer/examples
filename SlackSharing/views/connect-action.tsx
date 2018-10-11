/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import Bearer, { RootComponent, Events, Event, EventEmitter } from '@bearer/core'
import '@bearer/ui'
import Slack from './components/SlackLogo'
import { TAuthSavedPayload } from './types'

@RootComponent({
  role: 'action',
  group: 'connect'
})
export class ConnectAction {
  @Event()
  saved: EventEmitter<TAuthSavedPayload>

  componentDidLoad() {
    Bearer.emitter.addListener(Events.AUTHORIZED, ({ data }) => {
      this.saved.emit({ authId: data.authId })
    })
  }

  unauthorized = ({ authenticate }) => (
    <bearer-button kind="primary" onClick={authenticate}>
      <span class="root">
        <span>Connect to</span>
        <Slack height="1.5em" />
      </span>
    </bearer-button>
  )

  authorized = ({ revoke }) => (
    <bearer-button kind="warning" onClick={revoke}>
      <span class="root">
        <span>Revoke access to </span>
        <Slack color="#333" height="1.5em" />
      </span>
    </bearer-button>
  )

  render() {
    return <bearer-authorized renderUnauthorized={this.unauthorized} renderAuthorized={this.authorized} />
  }
}
