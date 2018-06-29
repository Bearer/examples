export interface Repository {
  url: string
  name: string
  full_name: string
}

export interface Ref {
  label: string
  ref: string
  repo: Repository
}

export interface PR {
  id: string
  html_url: string
  title: string
  number: number
  state: 'open' | 'closed' | 'merged'
  base: Ref
  head: Ref
  user: {
    login: string
  }
}

export declare interface State {
  attachedPullRequests: Array<PR>
}

export interface Action {
  type: string
  payload?: Object
}

export interface Store {
  dispatch: () => any
  subscribe: (cb: Function) => any
  getState: () => any
  getStore: () => any
  setStore: (any: any) => void
  mapStateToProps: (component: any, props: any) => void
  mapDispatchToProps: (component: any, props: any) => void
}
