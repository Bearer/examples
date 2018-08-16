import { Component, Prop } from '@bearer/core'

const defaults = [
  {
    text: '⏰ in 1min',
    value: 'in 1 min'
  },
  {
    text: '🗓 next monday',
    value: 'next monday'
  }
]
@Component({
  tag: 'when-selector',
  shadow: true
})
export class WhenSelector {
  @Prop()
  next: (when: string) => void
  @Prop()
  dates: Array<{ text: string; value: string }> = defaults

  goNext = when => this.next(when)

  render() {
    return <bearer-navigator-collection renderFunc={date => <span>{date.text}</span>} data={this.dates || defaults} />
  }
}
