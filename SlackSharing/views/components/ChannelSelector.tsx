import { Component, Intent, BearerFetch, State, Element, Event, EventEmitter } from '@bearer/core'
import { TChannel } from '../types'

@Component({
  tag: 'channel-selector',
  styleUrl: 'ChannelSelector.css',
  shadow: true
})
export class ChannelSelector {
  @Element()
  el: HTMLElement

  @Intent('ListChannel')
  listChannel: BearerFetch

  @State()
  channels: Array<TChannel> = []

  @State()
  suggestions: Array<TChannel> = []

  @State()
  fetchingChannels: boolean = false

  @State()
  input: string

  @State()
  selected: number = null

  @Event()
  selectChannel: EventEmitter<{ channel: TChannel }>

  @Event()
  close: EventEmitter

  filter = event => {
    this.input = event.target.value
    this.suggestions = [...this.channels.filter(c => fuzzysearch(this.input, c.name))]
    this.selected = 0
  }

  onFocus = (index: number) => () => {
    this.selected = index
  }

  onKeyPress = e => {
    switch (e.key) {
      case 'Escape': {
        this.close.emit()
        break
      }
      case 'Enter': {
        if (this.selected >= 0) {
          this.selectChannel.emit({ channel: this.suggestions[this.selected] })
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
        .then(({ data }: { data: Array<{ id: string; name: string; is_private: boolean }> }) => {
          this.suggestions = this.channels = data
        })
        .catch(console.error)
        .then(() => {
          this.fetchingChannels = false
        })
    }
  }

  componentDidLoad() {
    this.el.shadowRoot.querySelector('input').focus()
  }

  render() {
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
                    this.selectChannel.emit({ channel: c })
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
