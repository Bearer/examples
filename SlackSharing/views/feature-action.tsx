import Bearer, { RootComponent, Prop, Events, Event, EventEmitter, Intent, BearerFetch, State } from '@bearer/core'
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
  message: string = "Don't forget to bring your 🐻 to the party!! https://www.bearer.sh"
  @State()
  loading: boolean = false
  @State()
  error: boolean = false
  @State()
  shared: boolean = false
  @Event()
  propSet: EventEmitter

  componentDidLoad() {
    Bearer.emitter.addListener(`bearer:StateSaved:${this.SCENARIO_ID}`, data => {
      this.channelId = data.detail.referenceId
      this.notify({ name: 'channelId', value: this.channelId })
    })
    Bearer.emitter.addListener(Events.AUTHORIZED, ({ data }) => {
      this.authIdentifier = data.authIdentifier
      this.notify({ name: 'authIdentifier', value: this.authIdentifier })
    })
  }

  notify = params => {
    this.propSet.emit(params)
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
