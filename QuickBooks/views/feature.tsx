/*
  The purpose of this component is to deal with integration navigation between each views.
*/

import { BearerFetch, RootComponent, Function, State } from '@bearer/core'
import '@bearer/ui'

@RootComponent({
  name: 'feature'
})
export class Feature {
  @Function('fetchInvoices') fetchInvoices: BearerFetch
  @Function('updateInvoice') updateInvoice: BearerFetch
  @Function('updateInvoiceStatus') updateInvoiceStatus: BearerFetch

  @State() invoices: any
  @State() error: boolean = false

  componentDidLoad() {
    this.fetchInvoices()
      .then(({ data }) => {
        this.invoices = data.invoices
      })
      .catch(() => {
        this.error = true
      })
  }

  updateHandler = (e, key) => {
    e.preventDefault()

    const invoices = this.invoices

    // @ts-ignore
    invoices[key].note = e.target.value
    this.invoices = invoices

    this.updateInvoiceStatus({ invoice: JSON.stringify(this.invoices[key]) })
      .then(({ data }) => {
        console.log(data)
        this.invoices[key].syncToken = data.Invoice.SyncToken
      })
      .catch(() => {
        this.error = true
      })
  }

  testHandler = () => {
    this.updateInvoice({ invoice: JSON.stringify({ id: 152, note: 'paid' }) })
  }

  render() {
    return (
      <table>
        <tr>
          <th>
            <button onClick={this.testHandler}>Test</button>Name
          </th>
          <th>Customer</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        {this.invoices &&
          this.invoices.map((invoice, key) => (
            <tr>
              <td>{invoice.name}</td>
              <td>{invoice.customer.name}</td>
              <td>{invoice.amount}</td>
              <td>
                <select onInput={event => this.updateHandler(event, key)}>
                  <option value='ongoing' selected={invoice.note === 'ongoing'}>
                    Ongoing
                  </option>
                  <option value='void' selected={invoice.note === 'void'}>
                    Void
                  </option>
                  <option value='paid' selected={invoice.note === 'paid'}>
                    Paid
                  </option>
                </select>
              </td>
            </tr>
          ))}
      </table>
    )
  }
}
