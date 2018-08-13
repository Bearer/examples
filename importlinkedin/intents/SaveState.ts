import { SaveState, Toauth2Context, TSaveStateCallback } from '@bearer/intents'
// Uncomment this line if you need to use Client
// import Client from './client'

export default class SaveStateIntent {
  static intentName: string = 'SaveState'
  static intentType: any = SaveState

  
  static action(
    _context: Toauth2Context,
    _params: any,
    body: any,
    state: any,
    callback: TSaveStateCallback
  ): void {
    const { profile } = body
    callback({
      state: {
        ...state,
        profile: profile
      },
      data: profile
    })
  }
  
}

