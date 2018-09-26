/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import Bearer, { RootComponent, Prop, Events } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Prop({ mutable: true })
  authIdentifier: string
  @Prop({ mutable: true })
  channelId: string

  componentDidLoad() {
    Bearer.emitter.addListener(`bearer:StateSaved:${this.SCENARIO_ID}`, data => {
      this.channelId = data.detail.referenceId
    })
    Bearer.emitter.addListener(Events.AUTHORIZED, data => {
      this.authIdentifier = data.scenarioId.data.authIdentifier
    })
  }

  render() {
    return (
      <bearer-navigator btnProps={{ content: 'Share', kind: 'primary' }} direction="right">
        <bearer-navigator-screen name="channel" navigationTitle="Share">
          <share-slack authIdentifier={this.authIdentifier} channelId={this.channelId} />
        </bearer-navigator-screen>
      </bearer-navigator>
    )
  }
}
