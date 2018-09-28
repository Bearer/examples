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
  error: boolean = false
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
    this.error = false
    this.fetcher({
      authIdentifier: this.authIdentifier,
      channelId: this.channelId,
      body: { message: this.message }
    })
      .then(({ data }) => {
        if (data.ok) {
          this.shared = true
        }
      })
      .catch(e => {
        console.error('[BEARER]', 'Error', e)
        this.error = true
      })
      .then(() => {
        this.loading = false
      })
  }

  render() {
    const kind = this.shared ? 'success' : this.error ? 'danger' : 'primary'
    return (
      <bearer-button onClick={this.perform} kind={kind}>
        <div class="root">
          <span class="text">{this.text}</span>
          <status-icon visible={this.error || this.shared} kind={this.shared ? 'success' : 'error'} />
        </div>
      </bearer-button>
    )
  }
}
