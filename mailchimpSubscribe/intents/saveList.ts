import { SaveState, TbasicAuthContext, TSaveStateCallback } from '@bearer/intents'

export default class saveListIntent {
  static intentName: string = 'saveList'
  static intentType: any = SaveState

  static action(
    _context: TbasicAuthContext,
    _params: any,
    body: {list: any},
    state: any,
    callback: TSaveStateCallback
  ): void {

    callback({
      state: {
        ...state,
        list:{
          id: body.list.id
        }
      }
    })
  }

}
