import { Component, State, Intent, Prop, Watch } from '@bearer/core'

@Component({
  tag: 'subscribe-user',
  styleUrl: 'subscribeUser.css',
  shadow: true
})
export class SubscribeUser {

  @Watch('referenceId')
  @Prop() referenceId: string

  @State() email: string;
  @State() disabled: boolean = true;

  @State() complete: boolean;
  @State() error: boolean;

  @Intent('subscribeUser') fetcher: any


  handleSubmit(e) {
    this.disabled = true
    e.preventDefault()
    this.fetcher({ email_address: this.email, referenceId: this.referenceId })
      .then(( { data } ) => {
        console.log(data);
        this.complete = true
      })
      .catch(error => {
        console.error('Error while fetching', error)
        this.error = true
        this.disabled = false
      })
  }

  handleChange(event) {
    this.email = event.target.value
    if (this.email != ""){
      this.disabled = false
    }else{
      this.disabled = true
    }
  }

  render() {
    if (this.complete) {
      return(
        <bearer-alert kind="primary">You've been successfully subscribed!</bearer-alert>
      )

    } else {
      return(
        <div class="root">

          {this.error && <bearer-alert kind='danger'>Unable to subscribe you</bearer-alert>}

          <form class="subscribe" onSubmit={(e) => this.handleSubmit(e)}>
            <input type="email" class="subscribe-input" value={this.email} placeholder="Your email address" onInput={(e) => this.handleChange(e)} />
            <input type="submit" class="subscribe-submit" disabled={this.disabled} value="Keep me informed" />
          </form>
        </div>
      )
    }
  }
}
