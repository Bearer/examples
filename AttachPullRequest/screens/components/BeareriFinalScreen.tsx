import { Component, Prop, Method, Event, EventEmitter } from '@bearer/core'

@Component({
  tag: 'bearer-final-screen',
  shadow: true
})
export class BearerFinalScreen {
  @Event() scenarioCompleted: EventEmitter
  @Prop() perform: (any) => Promise<any>

  @Method()
  willAppear(context) {
    this.perform(context)
      .then(() => {
        this.scenarioCompleted.emit(context)
      })
      .catch(console.log)
  }

  @Method()
  willDisappear() {}

  @Method()
  getTitle() {}
  render() {
    return <slot />
  }
}
