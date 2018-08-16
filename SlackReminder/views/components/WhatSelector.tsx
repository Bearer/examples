import { Component, State, Prop } from '@bearer/core'

@Component({
  tag: 'what-selector',
  styleUrl: 'WhatSelector.css',
  shadow: true
})
export class WhatSelector {
  @State()
  what: string = ''
  @Prop()
  next: (data: any) => void
  @State()
  fieldSet: any = [{ label: 'What to reming?', type: 'text', controlName: 'what', value: '' }]

  handleSubmit = e => {
    e.preventDefault()
    if (this.what) {
      this.next(this.what)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} class="root">
        <bearer-input
          type="text"
          placeholder="Eat bananas 🍌"
          onValueChange={value => {
            this.what = value.detail
          }}
        />
        <div class="button">
          <bearer-input type="submit" disabled={!this.what} onSubmit={this.handleSubmit} />
        </div>
      </form>
    )
  }
}
