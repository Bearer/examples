/* global document */
/*
  The purpose of this component is to deal with scenario navigation between each screens.

*/

import { Component, Prop } from '@stencil/core'
import Bearer from '@apizi/core'

import '@apizi/ui'

@Component({
  tag: 'attach-pull-request',
  styleUrl: 'AttachPullRequest.css',
  shadow: true
})
export class AttachPullRequestAction {
  @Prop() bearerDisplayId = ''

  intent = ({ pullRequest }) =>
    new Promise((resolve, _reject) => {
      Bearer.emitter.emit(`BEARER_SCENARIO_ID:add:${this.bearerDisplayId}`, {
        pullRequest
      })
      resolve(true)
    })

  render() {
    return (
      <apizi-popover-navigator button="Attach Pull Request" direction="right">
        <apizi-navigator-auth-screen />
        <apizi-navigator-screen
          navigationTitle="Repositories"
          name="repository"
          renderFunc={() => <list-repositories />}
        />
        <apizi-navigator-screen
          navigationTitle={({ repository: { full_name } }) => full_name}
          name="pullRequest"
          renderFunc={({ data: { repository } }) => (
            <list-pull-requests repository={repository} />
          )}
        />
        <bearer-final-screen perform={this.intent} />
      </apizi-popover-navigator>
    )
  }
}
