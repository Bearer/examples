/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import Bearer, {
  Prop,
  Events,
  Element,
  RootComponent,
  Intent,
  IntentType,
  State,
  BearerFetch,
  Event,
  EventEmitter
} from '@bearer/core'
import '@bearer/ui'
import { TChannel, TSavedChannelPayload } from './types'

@RootComponent({
  role: 'action',
  group: 'channel'
})
export class ChannelAction {
  @Intent('saveChannel', IntentType.SaveState)
  saveChannel: BearerFetch
  @Intent('ListChannel')
  listChannel: BearerFetch

  @Prop({ mutable: true })
  authId: string

  @State()
  channel: TChannel
  @State()
  channels: Array<TChannel> = []
  @State()
  suggestions: Array<TChannel> = []
  @State()
  loading: boolean = true
  @State()
  fetchingChannels: boolean = false
  @State()
  editMode: boolean = false
  @State()
  selected: number = null

  @State()
  input: string

  @Element()
  el: HTMLElement

  @Event()
  propSet: EventEmitter

  @Event()
  saved: EventEmitter<TSavedChannelPayload>

  componentDidLoad() {
    Bearer.emitter.addListener(Events.AUTHORIZED, ({ data }) => {
      this.authId = data.authId
      this.notify({ name: 'authId', value: this.authId })
    })
  }

  notify = params => {
    this.propSet.emit(params)
  }

  attachChannel = (channel: TChannel): void => {
    this.editMode = false
    this.channel = channel
    this.saveChannel({ authId: this.authId, body: { channel } })
      .then(({ data, referenceId }) => {
        this.saved.emit({ channelId: referenceId, channel: data.channel })
      })
      .catch(error => {
        throw error
      })
      .then(() => {
        this.selected = null
      })
  }

  toggleEdit = () => {
    this.editMode = !this.editMode
  }

  onFocus = (index: number) => () => {
    this.selected = index
  }

  onKeyPress = e => {
    switch (e.key) {
      case 'Escape': {
        this.editMode = false
        break
      }
      case 'Enter': {
        if (this.selected >= 0) {
          this.attachChannel(this.suggestions[this.selected])
        }
        break
      }
      case 'ArrowDown': {
        this.selected = Math.min(this.selected + 1, this.suggestions.length - 1)
        break
      }
      case 'ArrowUp': {
        this.selected = Math.max(this.selected - 1, 0)
        break
      }
    }
  }

  onInputFocused = () => {
    if (!Boolean(this.suggestions.length)) {
      this.fetchingChannels = true
      this.listChannel()
        .then(({ data }) => {
          this.suggestions = this.channels = data
        })
        .catch(console.error)
        .then(() => {
          this.fetchingChannels = false
        })
    }
  }

  filter = event => {
    this.input = event.target.value
    this.suggestions = [...this.channels.filter(c => fuzzysearch(this.input, c.name))]
    this.selected = 0
  }

  render() {
    if (this.channel && !this.editMode) {
      return <selected-channel channel={this.channel} onEditClick={this.toggleEdit} />
    } else {
      return (
        <div class="channel-root">
          <div>
            <label class="search-icon" htmlFor="input" />
            <input
              autocomplete="off"
              id="input"
              placeholder="Search for a channel"
              onInput={this.filter}
              value={this.input}
              onFocus={this.onInputFocused}
              onKeyDown={this.onKeyPress}
            />
            {this.fetchingChannels && <bearer-loading />}
          </div>
          {!this.fetchingChannels &&
            Boolean(this.suggestions.length) && (
              <ul>
                {this.suggestions.map((c, index) => (
                  <li
                    class={this.selected === index ? 'selected' : ''}
                    onClick={() => {
                      this.attachChannel(c)
                    }}
                    onMouseEnter={this.onFocus(index)}
                  >
                    {c.is_private ? <channel-lock /> : '#'}
                    {c.name}
                    <button onFocus={this.onFocus(index)}>Select</button>
                  </li>
                ))}
              </ul>
            )}
        </div>
      )
    }
  }
}

// Source : https://github.com/bevacqua/fuzzysearch/blob/master/index.js
function fuzzysearch(needle, haystack) {
  var hlen = haystack.length
  var nlen = needle.length
  if (nlen > hlen) {
    return false
  }
  if (nlen === hlen) {
    return needle === haystack
  }
  outer: for (var i = 0, j = 0; i < nlen; i++) {
    var nch = needle.charCodeAt(i)
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer
      }
    }
    return false
  }
  return true
}
