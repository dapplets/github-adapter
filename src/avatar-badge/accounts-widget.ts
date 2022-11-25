import { html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { styles } from './accounts-widget.css'
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
  handleClose: any
}

export class AccountsWidget extends LitElement implements IAccountsWidgetState {
  public static override styles = styles

  @property() state: any
  @property() ctx: any
  @property() init: any
  @property() username: string
  @property() accounts: IConnectedAccountUser[]
  @property() showAccounts: boolean
  @property() el: HTMLElement
  @property() insPointName: string
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
    console.log('Copy button E', e)
    // copyIcon.src = COPIED
    // setTimeout(() => {
    //   accountsWrapper.style.visibility = 'hidden'
    //   accountsWrapper.style.opacity = '0'
    // }, 300)
    setTimeout(() => {
      // copyIcon.src = COPY
      this.handleClose()
    }, 600)
  }

  render() {
    return html`<div
      class=${`dapplets-connected-accounts-wrapper dapplets-connected-accounts-wrapper-${this.username}`}
      style=${styleMap({
        position: 'absolute',
        zIndex: '99999',
        left: '26px',
        top: '0',
        transition: 'opacity .2s, visibility .2s',
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

    // console.log('*** el ***', el)
    // const elForRects = el.querySelector(
    //   insPointName === 'PROFILE' ? 'div.clearfix.d-flex > div:nth-child(2)' : 'img'
    // )
    // if (elForRects) {
    //   const rect = elForRects.getBoundingClientRect()
    //   accountsWrapper.style.top = `${rect.top + window.scrollY - 71}px`
    //   // accountsWrapper.style.left = `${rect.left + window.scrollX}px`
    // }
  }
}
