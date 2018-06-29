import { GetCollection } from "@bearer/intents";
import { CLIENT, headersFor } from "./client";
export default class ListRepositories {
  static intentName: string = "listRepositories";
  static intentType: any = GetCollection;

  static action(token: string, params: any, callback: (params: any) => void) {
    CLIENT.get("user/repos", {
      params: { ...params, per_page: 10 },
      headers: headersFor(token)
    })
      .then(response => {
        callback({ collection: response.data });
      })
      .catch(e => {
        callback({ collection: [] });
      });
  }
}
