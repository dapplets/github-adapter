import { html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { styles } from './accounts-widget.css'
import COPIED from './assets/copied.svg'
import COPY from './assets/copy.svg'
import GITHUB_ICON from './assets/github.svg'
import NEAR_ICON from './assets/near-black.svg'
import TWITTER_ICON from './assets/twitter-icon.svg'
import { IConnectedAccountUser } from './types'

export interface IAccountsWidgetState {
  username: string
  accounts: IConnectedAccountUser[]
  showAccounts: boolean
  el: HTMLElement
  insPointName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClose: any
}

export class AccountsWidget extends LitElement implements IAccountsWidgetState {
  public static override styles = styles

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property() state: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property() ctx: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property() init: any
  @property() username: string
  @property() accounts: IConnectedAccountUser[]
  @property() showAccounts: boolean
  @property() el: HTMLElement
  @property() insPointName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property() handleClose: any

  connectedCallback() {
    super.connectedCallback()
    this.init?.(this.ctx, this.state)
  }

  private _clickAccountHandler = (account: IConnectedAccountUser) => (e) => {
    e.preventDefault()
    if (account.origin === 'twitter') {
      window.open(`https://twitter.com/${account.name}`, '_blank')
    } else if (account.origin === 'github') {
      window.open(`https://github.com/${account.name}`, '_blank')
    } else if (account.origin === 'near/testnet') {
      window.open(`https://explorer.testnet.near.org/accounts/${account.name}`, '_blank')
    } else if (account.origin === 'near/mainnet') {
      window.open(`https://explorer.near.org/accounts/${account.name}`, '_blank')
    }
    this.handleClose()
  }

  private _clickCopyHandler = (account: IConnectedAccountUser) => (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(account.name)
    const imgEl = e.target
    imgEl.src = COPIED
    const wrapperEl = imgEl.parentElement.parentElement.parentElement.parentElement
    setTimeout(() => {
      wrapperEl.style.visibility = 'hidden'
      wrapperEl.style.opacity = '0'
    }, 400)
    setTimeout(() => {
      imgEl.src = COPY
      this.handleClose()
    }, 600)
  }

  render() {
    return html`<div
      class=${`dapplets-connected-accounts-wrapper dapplets-connected-accounts-wrapper-${this.username}`}
      style=${styleMap({
        visibility: this.showAccounts ? 'visible' : 'hidden',
        opacity: this.showAccounts ? '1' : '0',
      })}
    >
      <div class="accounts">
        ${this.accounts.map(
          (account) =>
            html`<div class="account-container">
              <div
                class=${classMap({ account: true, nameUserActive: account.accountActive })}
                title=${'Go to the ' +
                (account.origin === 'twitter'
                  ? 'Twitter page'
                  : account.origin === 'github'
                  ? 'GitHub page'
                  : 'NEAR explorer')}
                @click=${this._clickAccountHandler(account)}
              >
                <img
                  src=${account.origin === 'twitter'
                    ? TWITTER_ICON
                    : account.origin === 'github'
                    ? GITHUB_ICON
                    : NEAR_ICON}
                  class="imgUser"
                />
                <h4 class="nameUser">${account.name}</h4>
              </div>
              <a class="copy-button" title="copy ID" @click=${this._clickCopyHandler(account)}>
                <img src=${COPY} class="copy-icon" alt="copy button" />
              </a>
            </div>`
        )}
      </div>
    </div>`
  }
}
