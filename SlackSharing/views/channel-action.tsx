/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent, State, Listen } from '@bearer/core'
import '@bearer/ui'
import { TChannel, Input, Output, BearerRef } from './types'

@RootComponent({
  role: 'action',
  group: 'channel'
})
export class ChannelAction {
  @Input()
  auth: BearerRef<string>

  @Output()
  channel: BearerRef<TChannel>

  @State()
  editMode: boolean = false

  attachChannel = (channel: TChannel): void => {
    this.editMode = false
    this.channel = channel
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
