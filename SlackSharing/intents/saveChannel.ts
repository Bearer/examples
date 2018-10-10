import { SaveState, TOAUTH2AuthContext, TSaveStateCallback } from '@bearer/intents'

export default class SaveChannelIntent {
  static intentName: string = 'saveChannel'
  static intentType: any = SaveState

  static action(
    _context: TOAUTH2AuthContext,
    _params: any,
    body: { channel: any },
    state: any,
    callback: TSaveStateCallback
  ): void {
    callback({
      state: { ...state, id: body.channel.id },
      data: { channel: body.channel }
    })
  }
}
