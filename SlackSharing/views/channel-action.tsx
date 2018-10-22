/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { Prop, Element, RootComponent, Intent, State, BearerFetch, Event, EventEmitter, Listen } from '@bearer/core'
import '@bearer/ui'
import { TChannel, TSavedChannelPayload } from './types'

@RootComponent({
  role: 'action',
  group: 'channel'
})
export class ChannelAction {
  @Intent('saveChannel')
  saveChannel: BearerFetch<TChannel>

  @Prop({ mutable: true })
  authId: string

  @State()
  channel: TChannel
  @State()
  editMode: boolean = false

  @Element()
  el: HTMLElement

  @Event()
  propSet: EventEmitter

  @Event()
  saved: EventEmitter<TSavedChannelPayload>

  @Listen('body:connect:authorized')
  handler(event) {
    this.authId = event.detail.authId
    this.notify({ name: 'authId', value: this.authId })
  }

  notify = params => {
    this.propSet.emit(params)
  }

  attachChannel = (channel: TChannel): void => {
    this.editMode = false
    this.channel = channel
    this.saveChannel({ authId: this.authId, body: { channel } })
      .then(({ data, referenceId }) => {
        this.saved.emit({ channelId: referenceId, channel: data })
      })
      .catch(error => {
        throw error
      })
  }

  toggleEdit = () => {
    this.editMode = !this.editMode
  }

  @Listen('no-group:selectChannel')
  channelSelected(event) {
    this.attachChannel(event.detail.channel)
  }

  @Listen('no-group:close')
  closed() {
    this.editMode = false
  }

  render() {
    if (this.channel && !this.editMode) {
      return <selected-channel channel={this.channel} onEditClick={this.toggleEdit} />
    } else {
      return <channel-selector />
    }
  }
}
