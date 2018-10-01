import { Component, Prop } from '@bearer/core'
import { TChannel } from '../types'

@Component({
  tag: 'selected-channel',
  styleUrl: 'SelectedChannel.css',
  shadow: true
})
export class SelectedChannel {
  @Prop()
  channel: TChannel = null
  @Prop()
  onEditClick: () => void
  render() {
    return (
      <div>
        {this.channel.is_private ? <channel-lock /> : '#'}
        {this.channel.name}{' '}
        <button class="btn-edit" onClick={this.onEditClick}>
          (Edit)
        </button>
      </div>
    )
  }
}
