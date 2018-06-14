import { BearerState as ScenarioState } from '@bearer/core'
import { connect } from '../BearerStateDecorator'
import { ActionTypes } from '../store'

function mapDispatchToProps() {
  return {
    attachPullRequest: pullRequest => (dispatch, state) =>
      new Promise((resolve, _reject) => {
        ScenarioState.storeData(
          this.bearerDisplayId,
          preparePayload(state().attachedPullRequests.concat(pullRequest))
        ).then(() => {
          dispatch({
            type: ActionTypes.PULL_REQUEST_SELECTED,
            payload: { pullRequest }
          })
          resolve(true)
        })
      })
  }
}

function preparePayload(pullRequests) {
  return {
    pullRequests: pullRequests.map(
      ({
        number,
        base: {
          repo: { full_name }
        }
      }) => ({
        number,
        fullName: full_name
      })
    )
  }
}

export default connect(mapDispatchToProps)
