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
  authId: string

  componentDidLoad() {
    Bearer.emitter.addListener(Events.AUTHORIZED, ({ data }) => {
      this.authId = data.authId
    })
  }

  render() {
    return (
      <p>
        User authenticated with User ID:
        <bearer-badge>{this.authId ? this.authId : 'Not Set'}</bearer-badge>
      </p>
    )
  }
}
