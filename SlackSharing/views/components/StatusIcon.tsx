import { Component, Prop } from '@bearer/core'

@Component({
  tag: 'status-icon',
  styleUrl: 'StatusIcon.css',
  shadow: true
})
export class StatusIcon {
  @Prop()
  visible: boolean = false
  @Prop()
  kind: 'error' | 'success'
  render() {
    return <div class={`root ${this.visible ? 'visible' : 'hidden'} ${this.kind}`} />
  }
}
