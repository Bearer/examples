/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { RootComponent } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  name: 'display',
  group: 'config'
})
export class ConfigDisplay {
  @Prop() referenceId: string

  render() {
    return (
      <display-lists referenceId={this.referenceId}/>
    )
  }
}
