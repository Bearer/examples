import { FetchData, TFetchActionEvent, TFetchPromise } from '@bearer/functions'
import { TContextRefresh, TOAUTH2AuthContext } from './types'
import Client from './client'
import jwt from 'jsonwebtoken'

export default class UpdateInvoiceStatusFunction extends FetchData
  implements FetchData<ReturnedData, any, TOAUTH2AuthContext> {
  async action(event: TFetchActionEvent<Params, TOAUTH2AuthContext, TContextRefresh>): TFetchPromise<ReturnedData> {
    try {
      const client = await Client(event.context)
      const { realmid } = jwt.decode(event.context.authAccess.idToken)

      const invoiceParams = event.params.invoice
      const invoice = typeof invoiceParams === 'string' ? JSON.parse(invoiceParams) : invoiceParams

      const body = {
        sparse: true,
        SyncToken: invoice.syncToken,
        Id: invoice.id,
        PrivateNote: invoice.note
      }
      const { data } = await client.post(`/v3/company/${realmid}/invoice`, body)
      return { data }
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

/**
 * Typing
 */
export type Params = {
  invoice: string
  realm: string
  customerId: string
}

export type ReturnedData = any
