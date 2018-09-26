/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import Bearer, { Events, RootComponent, State } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  role: 'display',
  group: 'connect'
})
export class ConnectDisplay {
  @State()
  authIdentifier: string

  componentDidLoad() {
    Bearer.emitter.addListener(Events.AUTHORIZED, data => {
      this.authIdentifier = data.scenarioId.data.authIdentifier
    })
  }

  render() {
    return (
      <p>
        User authenticated with User ID:
        <bearer-badge>{this.authIdentifier ? this.authIdentifier : 'Not Set'}</bearer-badge>
      </p>
    )
  }
}
