/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import Bearer, { State, RootComponent } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  role: 'display',
  group: 'channel'
})
export class ChannelDisplay {
  @State() channelId: string

  componentDidLoad() {
    Bearer.emitter.addListener(`bearer:StateSaved:${this.SCENARIO_ID}`, data => {
      this.channelId = data.detail.referenceId
    })
  }

  render() {
    if this.channelId
      return (
        <p>
          User authenticated with Channel ID:
          <bearer-badge>{this.channelId ? this.channelId : "Not Set"}</bearer-badge>
        </p>
      )
  }
}
