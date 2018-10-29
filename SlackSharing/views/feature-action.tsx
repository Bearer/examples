import Bearer, {
  RootComponent,
  Prop,
  Events,
  Event,
  EventEmitter,
  Intent,
  BearerFetch,
  State,
  Listen
} from '@bearer/core'
import '@bearer/ui'
import { TSavedChannelPayload } from './types'
@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Intent('Share')
  fetcher: BearerFetch
  @Prop({ mutable: true })
  authId: string
  @Prop({ mutable: true })
  channelId: string
  @Prop()
  text: string = 'Share on slack'
  @Prop()
  message: string = 'Hey, this is Bearer.sh reaching out 🐻'
  @State()
  loading: boolean = false
  @State()
  error: boolean = false
  @State()
  shared: boolean = false
  @Event()
  propSet: EventEmitter

  @Listen('body:channel:saved')
  savedChannelHandler(event: { detail: TSavedChannelPayload }) {
    console.log('[BEARER]', 'event.detail', event.detail)
    if (this.channelId !== event.detail.channelId) {
      this.shared = false
    }
    this.channelId = event.detail.channelId
    // dev portal specific code
    this.notify({ name: 'channelId', value: this.channelId })
  }

  componentDidLoad() {
    Bearer.emitter.addListener(Events.AUTHORIZED, ({ data }) => {
      this.authId = data.authId
      this.notify({ name: 'authId', value: this.authId })
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
      authId: this.authId,
      channelId: this.channelId,
      body: { message: this.message }
    })
      .then(({ data }) => {
        if (data.ok) {
          this.shared = true
          setTimeout(() => {
            this.shared = false
          }, 3000)
        }
      })
      .catch(e => {
        console.error('[BEARER]', 'Error', e)
        this.error = true
        setTimeout(() => {
          this.error = false
        }, 3000)
      })
      .then(() => {
        this.loading = false
      })
  }

  render() {
    const kind = this.shared ? 'success' : this.error ? 'danger' : 'light'
    return (
      <bearer-button onClick={this.perform} kind={kind}>
        <div class="root">{this.text}</div>
      </bearer-button>
    )
  }
}
