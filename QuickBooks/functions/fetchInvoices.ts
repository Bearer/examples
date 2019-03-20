import { FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import { TContextRefresh, TOAUTH2AuthContext } from './types'
import Client from './client'
import jwt from 'jsonwebtoken'

export default class FetchInvoicesFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext, TContextRefresh>): TFetchPromise<ReturnedData> {
    try {
      const client = await Client(event.context)
      const { realmid } = jwt.decode(event.context.authAccess.idToken)

      let query = `SELECT * FROM invoice ORDER BY Id DESC MAXRESULTS 10`

      const {
        data: {
          QueryResponse: { Invoice }
        }
      } = await client.get(`/v3/company/${realmid}/query`, {
        params: { query }
      })

      const invoices = (Invoice || []).reduce((acc, invoice) => {
        return [
          ...acc,
          {
            id: invoice.Id,
            name: `Invoice:${invoice.Id}`,
            customer: {
              name: invoice.CustomerRef.name
            },
            syncToken: invoice.SyncToken,
            currency: invoice.CurrencyRef.value,
            date: {
              issued: invoice.TxnDate,
              due: invoice.DueDate
            },
            note: invoice.PrivateNote,
            amount: invoice.Line.find(line => line.DetailType == 'SubTotalLineDetail').Amount
          }
        ]
      }, [])

      return {
        data: {
          invoices
        }
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

/**
 * Typing
 */
export type Params = any
export type ReturnedData = any
