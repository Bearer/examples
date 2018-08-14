import { RootComponent, Prop } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  name: 'display',
  group: 'feature'
})
export class FeatureDisplay {
  // Create a referenceId Property
  @Prop() referenceId: string
  render() {
    return (
      // Add the referenceId
      <display-attached-pull-requests referenceId={this.referenceId} />
    )
  }
}
