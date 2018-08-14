import { Component, State, BearerState, Intent, IntentType} from '@bearer/core'

@Component({
  tag: 'display-lists',
  shadow: true
})
export class DisplayLists {
  @State() loading: boolean = true

  @Intent('retrieveList', IntentType.RetrieveState) retrieveList: any
  @Intent('saveList', IntentType.SaveState) saveList: any

  @Watch('referenceId')
  handler() {
    this.componentDidLoad()
  }

  @BearerState({
    statePropName: 'attachedList'
  }) list: any = {}

  componentDidLoad() {
    this.loading = true
    this.retrieveList()
      .then(({data}) => {
        if (data){
          this.list = data
        }
        this.loading = false
      })
      .catch( error => {
        console.error('Error while fetching', error)
        this.loading = false
      })
  }

  get hasAttachedList(): boolean {
    return Boolean(this.list.id)
  }

  listDeletedHandler(alist) {
    return ( ) => {
      this.list = {}
      this.saveList({ body: {list: this.list} })
        .catch( error => {
          console.error('Error while saving new list', error)
          this.list = alist
        })
    }
  }

  render() {
    if (this.loading) {
      return <bearer-loading />
    }
    const hasLists = this.hasAttachedList

    return (
      <bearer-alert kind={hasLists ? 'info' : 'secondary'}>
        {hasLists &&
          <ul>
            <li>
              List name: <strong>{this.list.name}</strong> - List ID: <strong>{this.list.id}</strong> (<i><a href="#" onClick={this.listDeletedHandler(this.list)}>delete</a></i>)
            </li>
          </ul>
        }

        {!hasLists && 'No List attached'}
      </bearer-alert>
    )
  }
}
