import Bearer, { BearerComponent, Component, Prop, State } from '@bearer/core'

@BearerComponent
@Component({
  tag: 'pin-pull-request',
  styleUrl: 'PinPullRequest.css',
  shadow: true
})
export class PinPullRequest {
  @Prop() context: any

  @State() name: string

  componentWillLoad() {
    const pullRequest = this.context.data['list-pull-requests']
    const referenceId = this.context.bearerDisplayId
    console.log('Pin action: ', `BEARER_SCENARIO_ID:${referenceId}`)
    Bearer.emitter.emit(`BEARER_SCENARIO_ID:${referenceId}`, {
      referenceId,
      pullRequest
    })
  }

  render() {
    return <div class="root">And the winner is: {this.name}</div>
  }
}
