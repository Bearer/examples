import { Component, Prop } from '@bearer/core'

@Component({
  tag: 'when-selector',
  styleUrl: 'WhenSelector.css',
  shadow: true
})
export class WhenSelector {
  @Prop()
  next: (when: string) => void
  @Prop()
  dates: Array<{ text: string; value: string }> = [
    {
      text: 'in 1min',
      value: 'in 1 min'
    },
    {
      text: 'in 15 min',
      value: 'in 15 min'
    }
  ]

  goNext = when => this.next(when)

  render() {
    return (
      <div class="root">
        {this.dates.map(date => (
          <bearer-button kind="primary" onClick={() => this.goNext(date.value)}>
            {date.text}
          </bearer-button>
        ))}
      </div>
    )
  }
}
