import { BearerFetch, Component, Intent, Prop, State, Watch } from '@bearer/core'

@Component({
  tag: 'share-slack',
  shadow: true
})
export class Share {
  @Intent('Share') fetcher: BearerFetch
  @Prop() channelId: string
  @Prop() authId: string
  @State() channel: any

  @Watch('channelId')
  channelUpdated(newValue: string, _oldValue: string) {
    if(newValue && this.authId) {
      this.fetchChannel()
    }
  }

  @Watch('authId')
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
      authId: this.authId,
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
