import { GetCollection, TContext } from '@bearer/intents'
import { CLIENT, headersFor } from './client'

export default class GetStarWarsCharacters {
  static intentName: string = 'getStarWarsCharacters'
  static intentType: any = GetCollection

  static action(
    context: TContext,
    params: any,
    callback: (params: any) => void
  ) {
    console.log(context);
    console.log(headersFor(context.accessToken));
    // `/list/${context.config.ListID}/members`,
    CLIENT.get(
      '/lists/c57d2d24df/members',
      {
        headers: headersFor(context.accessToken)
      }
    ).then(({ data }) => {
      console.log(data);
      callback({ collection: data.members })
    })
  }
}
