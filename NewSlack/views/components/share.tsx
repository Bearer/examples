import { BearerFetch, Component, Intent, Prop, State, Watch } from '@bearer/core'

@Component({
  tag: 'share-slack',
  shadow: true
})
export class Share {
  @Intent('Share') fetcher: BearerFetch
  @Prop() channelId: string
  @Prop() authIdentifier: string
  @State() channel: any

  @Watch('channelId')
  channelUpdated(newValue: string, _oldValue: string) {
    if(newValue && this.authIdentifier) {
      this.fetchChannel()
    }
  }

  @Watch('authIdentifier')
  authUpdated(newValue: string, _oldValue: string) {
    if(newValue && this.channelId) {
      this.fetchChannel()
    }
  }

  componentDidLoad() {
    this.fetchChannel()
  }

  fetchChannel() {
    return this.fetcher({
      authIdentifier: this.authIdentifier,
      channelId: this.channelId
    })
    .then( data => {
      console.log(data)
      this.channel = data.data.channel
    })
  }

  render() {
    if (this.channel) {
      return (
        <p>
        {this.channel.id}
        {this.channel.name}
        {this.channel.purpose.value}
        </p>
      )
    }
  }
}
