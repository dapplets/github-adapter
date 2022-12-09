import { html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { AccountsWidget } from './accounts-widget'
import { styles } from './avatar-badge.css'
import description from './description'
import { IAvatarBadgeState, IConnectedAccountUser } from './types'

customElements.define('accounts-widget', AccountsWidget)

class AvatarBadge extends LitElement implements IAvatarBadgeState {
  public static override styles = styles
  public static widgetParamsDescription = description
  public static contextInsPoints = {
    POST: 'AVATAR_BADGE',
    PROFILE: 'AVATAR_BADGE',
  }
  private _accountsWidget

  @property() state: IAvatarBadgeState
  @property() insPointName: string
  @property() img?: string | null
  @property() video?: string
  @property() mediaType?: string
  @property() basic?: boolean
  @property() vertical: 'top' | 'bottom'
  @property() horizontal: 'left' | 'right'
  @property() hidden: boolean
  @property() tooltip?: string | string[]
  @property() theme?: 'DARK' | 'LIGHT'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property() exec?: (ctx: any, me: IAvatarBadgeState) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property() init?: (tx: any, me: IAvatarBadgeState) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property() ctx: any
  @property() username: string
  @property() accounts?: IConnectedAccountUser[]
  @property() showAccounts?: boolean

  connectedCallback() {
    super.connectedCallback()
    this.init?.(this.ctx, this.state)
  }

  private _clickHandler(e) {
    this.exec?.(this.ctx, this.state)
    e.stopPropagation()
  }

  override render() {
    if (this.hidden || !(this.img || this.video)) return null

    if (this.accounts && this.username) {
      const handleCloseAccounts = () => {
        this.state.showAccounts = false
      }

      if (!this._accountsWidget) {
        this._accountsWidget = document.createElement('accounts-widget')
        const elementToInsertWidget = document.querySelector(
          'main > div:nth-child(2) > div > div > div > div:nth-child(2)'
        )
        elementToInsertWidget.append(this._accountsWidget)
        window.addEventListener('popstate', handleCloseAccounts)
        window.addEventListener('click', (e) => {
          if (e.target === this._accountsWidget) {
            setTimeout(() => {
              handleCloseAccounts()
            }, 400)
          } else {
            handleCloseAccounts()
          }
        })
      }
      this._accountsWidget.username = this.username
      this._accountsWidget.accounts = this.accounts
      this._accountsWidget.showAccounts = this.showAccounts
    }

    return html`<div
      title=${this.tooltip
        ? typeof this.tooltip === 'string'
          ? this.tooltip
          : this.tooltip.join('\n')
        : ''}
      class=${classMap({
        'avatar-badge': true,
        clickable: !!this.exec,
        'post-badge': this.insPointName === 'POST',
        'profile-badge': this.insPointName === 'PROFILE',
        'not-basic': !this.basic,
        dark: this.theme === 'DARK',
      })}
      style=${styleMap({
        top: this.vertical === 'top' ? (this.insPointName === 'POST' ? '-2px' : '6%') : undefined,
        bottom:
          this.vertical === 'bottom' ? (this.insPointName === 'POST' ? '-2px' : '6%') : undefined,
        left:
          this.horizontal === 'left' ? (this.insPointName === 'POST' ? '-7px' : '2%') : undefined,
        right:
          this.horizontal === 'right' ? (this.insPointName === 'POST' ? '-7px' : '2%') : undefined,
      })}
      @click=${this._clickHandler}
    >
      ${this.img && (this.mediaType === undefined || this.mediaType !== 'application/octet-stream')
        ? html`<img src=${this.img} style=${styleMap({ width: '100%' })} />`
        : this.video ?? (this.img && this.mediaType === 'application/octet-stream')
        ? html`<video
            src=${this.video ?? this.img}
            autoplay
            muted
            loop
            style=${styleMap({ width: '100%' })}
          />`
        : ''}
    </div>`
  }
}

export { AvatarBadge, IAvatarBadgeState }
