/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import Bearer, { Element, RootComponent, BearerState, Intent, IntentType } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  role: 'action',
  group: 'channel'
})
export class ChannelAction {
  @Intent('saveChannel', IntentType.SaveState)
  saveChannel: any
  @BearerState()
  attachedChannel: string
  @Element()
  el: HTMLElement

  componentDidLoad() {
    this.el.addEventListener('bearer:StateSaved', e => {
      Bearer.emitter.emit(`bearer:StateSaved:${this.SCENARIO_ID}`, e)
    })
  }

  attachChannel = ({ data, complete }): void => {
    this.saveChannel({ body: data })
      .then(() => {
        this.attachedChannel = data.channel
        complete()
      })
      .catch(error => {
        throw error
      })
  }

  render() {
    return (
      <bearer-navigator
        btnProps={{ content: 'Select a List', kind: 'primary' }}
        direction="right"
        complete={this.attachChannel}
      >
        <bearer-navigator-screen name="channel" navigationTitle="Available Channels">
          <retrieve-channels />
        </bearer-navigator-screen>
      </bearer-navigator>
    )
  }
}
