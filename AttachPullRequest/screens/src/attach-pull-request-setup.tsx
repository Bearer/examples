/*
  The purpose of this component is to save scenario credentials.
  This file has been generated automatically and should not be edited.
*/

import { Component, State } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request-setup',
  shadow: true
})
export class attachPullRequestSetup {
  @State() fields = []
  @State() innerListener = `setup_success:BEARER_SCENARIO_ID`
  render() {
    return (
      <div>
        <bearer-dropdown-button innerListener={this.innerListener}>
          <span slot="buttonText">Setup component</span>
          <bearer-setup scenario-id="BEARER_SCENARIO_ID" fields={this.fields} />
        </bearer-dropdown-button>
      </div>
    )
  }
}

