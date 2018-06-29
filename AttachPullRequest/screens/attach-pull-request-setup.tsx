/*
  The purpose of this component is to save scenario credentials.
*/

import { Component } from '@bearer/core'
import '@bearer/ui'

@Component({
  tag: 'attach-pull-request-setup',
  shadow: true
})
export class AttachPullRequestSetup {
  render() {
    const innerListener = `setup_success:BEARER_SCENARIO_ID`
    return (
      <div>
        <bearer-dropdown-button innerListener={innerListener}>
          <span slot="buttonText">Setup component</span>
          <bearer-setup scenario-id="BEARER_SCENARIO_ID" />
        </bearer-dropdown-button>
      </div>
    )
  }
}
