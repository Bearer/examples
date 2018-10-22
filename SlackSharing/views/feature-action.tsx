import { RootComponent, Prop, Intent, BearerFetch, State } from '@bearer/core'
import '@bearer/ui'
import { Input, Output, BearerRef, TChannel } from './types'
@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Input()
  auth: BearerRef<string>
  @Input()
  channel: BearerRef<TChannel>

  @Output()
  notification: BearerRef<any>

  @Intent('Share')
  fetcher: BearerFetch

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

  perform = () => {
    if (this.shared) {
      return
    }
    this.loading = true
    this.error = false
    this.fetcher({ body: { message: this.message, authId: this.auth, channelId: this.channel } })
      .then(({ data }) => {
        if (data.ok) {
          this.notification = { referenceId: new Date() }
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
