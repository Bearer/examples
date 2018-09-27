/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import Bearer, { RootComponent, Prop, Events, Intent, BearerFetch, State } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Intent('Share')
  fetcher: BearerFetch
  @Prop({ mutable: true })
  authIdentifier: string
  @Prop({ mutable: true })
  channelId: string
  @Prop()
  text: string = 'Share on slack'
  @Prop()
  message: string = 'Eat bananas is super healthy :banana: :arrow_right: :muscle:'
  @State()
  loading: boolean = false
  @State()
  shared: boolean = false

  componentDidLoad() {
    Bearer.emitter.addListener(`bearer:StateSaved:${this.SCENARIO_ID}`, data => {
      this.channelId = data.detail.referenceId
    })
    Bearer.emitter.addListener(Events.AUTHORIZED, data => {
      this.authIdentifier = data.scenarioId.data.authIdentifier
    })
  }

  perform = () => {
    if (this.shared) {
      return
    }
    this.loading = true
    this.fetcher({
      authIdentifier: this.authIdentifier,
      channelId: this.channelId,
      body: {
        message: this.message
      }
    })
      .then(({ data }) => {
        if (data.ok) {
          this.shared = true
        }
      })
      .catch(e => {
        console.error('[BEARER]', 'Error', e)
      })
      .then(() => {
        this.loading = false
      })
  }

  render() {
    return (
      <bearer-button onClick={this.perform} kind={this.shared ? 'success' : 'primary'}>
        <span class="text">{this.text}</span>
        <span class={this.shared ? 'check shared' : 'check'} />
      </bearer-button>
      // <bearer-navigator btnProps={{ content: 'Share', kind: 'primary' }} direction="right">
      //   <bearer-navigator-screen name="channel" navigationTitle="Share">
      //     <share-slack authIdentifier={this.authIdentifier} channelId={this.channelId} />
      //   </bearer-navigator-screen>
      // </bearer-navigator>
    )
  }
}
