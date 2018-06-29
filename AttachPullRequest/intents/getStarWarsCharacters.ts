import { GetCollection } from '@bearer/intents'
import { CLIENT } from './client'

export default class GetStarWarsCharacters {
  static intentName: string = 'getStarWarsCharacters'
  static intentType: any = GetCollection

  static action(token: string, params: any, callback: (params: any) => void) {
    CLIENT.get('/people').then(({ data }) => {
      callback({ collection: data.results })
    })
  }
}
