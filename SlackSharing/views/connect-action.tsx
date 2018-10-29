/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import Bearer, { RootComponent, Events, Event, EventEmitter, Prop, Element, State } from '@bearer/core'
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
  @Event()
  revoked: EventEmitter<TAuthorizedPayload>

  @Prop({ mutable: true })
  authId: string = null

  @State()
  authIdInternal: string
  @Element()
  el: HTMLElement

  componentDidLoad() {
    this.authIdInternal = this.authId

    Bearer.emitter.addListener(Events.AUTHORIZED, ({ data }: { data: TAuthSavedPayload }) => {
      const authId = data.authId || (data as any).authIdentifier
      this.authId = this.authIdInternal = authId
      this.authorized.emit({ authId })
    })

    Bearer.emitter.addListener(Events.REVOKED, (_payload: { data: TAuthSavedPayload }) => {
      this.authIdInternal = this.authId = null
      this.revoked.emit()
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

  renderUnauthorizedIfAuthId = ({ authenticate }) => this.authIdInternal && this.renderUnauthorized({ authenticate })

  authenticate = () => {
    this.el.querySelector('bearer-authorized').authenticate()
  }

  render() {
    return [
      <bearer-authorized
        renderUnauthorized={this.renderUnauthorizedIfAuthId}
        renderAuthorized={({ revoke }) =>
          this.authIdInternal && (
            <bearer-button kind="danger" outline onClick={revoke}>
              <span class="root">
                <Cross />
                <span>Revoke access to your Slack</span>
              </span>
            </bearer-button>
          )
        }
      />,
      !this.authIdInternal && this.renderUnauthorized({ authenticate: this.authenticate })
    ]
  }
}
