import { BearerState as ScenarioState } from '@bearer/core'
import { connect } from '@bearer/core/dist/state'
import { ActionTypes } from '../store'
import { preparePayload } from './attach-pull-request-action'

function mapDispatchToProps() {
  return {
    detachPullRequest: pullRequest => (dispatch, state) =>
      ScenarioState.storeData(
        this.bearerId,
        preparePayload(
          state().attachedPullRequests.filter(pr => pr['id'] !== pullRequest.id)
        )
      ).then(() => {
        dispatch({
          type: ActionTypes.PULL_REQUESTED_DETACHED,
          payload: { pullRequest }
        })
      }),
    fetchState: () => dispatch =>
      ScenarioState.getData(this.bearerId)
        .then(async ({ Item }: { Item: any }) => {
          if (Item.pullRequests) {
            await Promise.all(Item.pullRequests.map(this.getPullRequest)).then(
              pullRequests => {
                dispatch({
                  type: ActionTypes.STATE_RECEIVED,
                  payload: { pullRequests: pullRequests.filter(pr => pr['id']) }
                })
              }
            )
          }
        })
        .catch(e => {
          console.error('error', e)
        })
  }
}

function mapStateToProps(state) {
  return {
    pullRequests: state.attachedPullRequests
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
