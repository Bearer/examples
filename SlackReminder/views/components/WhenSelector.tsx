import { Component, Prop } from '@bearer/core'

@Component({
  tag: 'when-selector',
  shadow: true
})
export class WhenSelector {
  @Prop()
  next: (when: string) => void
  @Prop()
  dates: Array<{ text: string; value: string }> = [
    {
      text: '⏰ in 1min',
      value: 'in 1 min'
    },
    {
      text: '🗓 next monday',
      value: 'next monday'
    }
  ]

  goNext = when => this.next(when)

  render() {
    return <bearer-navigator-collection renderFunc={date => <span>{date.text}</span>} data={this.dates} />
  }
}
