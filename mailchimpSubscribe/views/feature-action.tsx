/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent, Prop } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
  @Prop() referenceId: string
  render() {
    return (
      <subscribe-user referenceId={this.referenceId}/>
    )
  }
}
