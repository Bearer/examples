import { createStore } from '@bearer/core/dist/state'
import { State, Action } from './types.d'

export enum ActionTypes {
  STATE_RECEIVED = 'STATE_RECEIVED',
  PULL_REQUESTS_RECEIVED = 'PULL_REQUESTS_RECEIVED',
  PULL_REQUEST_SELECTED = 'PULL_REQUEST_SELECTED',
  PULL_REQUESTED_DETACHED = 'PULL_REQUESTED_DETACHED'
}

// reducers/scenario.js
const initialState: State = {
  attachedPullRequests: []
}

/* Reducers */
const scenario = (state: State = initialState, { type, payload }: Action) => {
  switch (type) {
    case ActionTypes.PULL_REQUEST_SELECTED: {
      return {
        ...state,
        attachedPullRequests: [
          ...state.attachedPullRequests,
          payload['pullRequest']
        ]
      }
    }

    case ActionTypes.PULL_REQUESTED_DETACHED: {
      return {
        ...state,
        attachedPullRequests: [
          ...state.attachedPullRequests.filter(
            pr => pr.id !== payload['pullRequest']['id']
          )
        ]
      }
    }

    case ActionTypes.STATE_RECEIVED: {
      return {
        ...state,
        attachedPullRequests: payload['pullRequests']
      }
    }

    default: {
      return state
    }
  }
}

// end reducers/scenario.js

/* Store */
const configStore = () => {
  return createStore(
    scenario,
    undefined,
    window['__REDUX_DEVTOOLS_EXTENSION__'] &&
      window['__REDUX_DEVTOOLS_EXTENSION__']({
        instanceId: 'BEARER_SCENARIO_ID'
      })
  )
}

export { configStore }
