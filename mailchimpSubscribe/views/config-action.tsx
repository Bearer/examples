/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import { RootComponent, BearerState, Intent, IntentType } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  role: 'action',
  group: 'config'
})
export class ConfigAction {

  @Intent('saveList', IntentType.SaveState) saveList: any
  @BearerState() attachedList: Array<any> = []

  attachList = ({ data, complete }): void => {
    this.saveList({ body: data })
      .then(() => {
        this.attachedList = data.list
        complete()
      })
      .catch( error => {
        throw error
      })
  }

  render() {
    return (
      <div>
        <bearer-navigator
            btnProps={ {content:"Select a List", kind:"primary"} }
            direction="right"
            complete={this.attachList}>
          <bearer-navigator-screen name="list" navigationTitle="Available Lists">
            <retrieve-lists />
          </bearer-navigator-screen>
        </bearer-navigator>
      </div>
    )
  }
}
