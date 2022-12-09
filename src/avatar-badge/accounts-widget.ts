import { html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { styles } from './accounts-widget.css'
import COPIED from './assets/copied.svg'
import COPY from './assets/copy.svg'
import { resources } from './resources'
import { IConnectedAccountUser } from './types'

export interface IAccountsWidgetState {
  username: string
  accounts: IConnectedAccountUser[]
  showAccounts: boolean
}

export class AccountsWidget extends LitElement implements IAccountsWidgetState {
  public static override styles = styles

  @property() username: string
  @property() accounts: IConnectedAccountUser[]
  @property() showAccounts: boolean

  private _clickCopyHandler = (account: IConnectedAccountUser) => (e: PointerEvent) => {
    e.preventDefault()
    const image = <HTMLImageElement>e.target
    navigator.clipboard.writeText(account.name)
    image.src = COPIED
    setTimeout(() => {
      image.src = COPY
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
              <a
                class=${classMap({ account: true, nameUserActive: account.accountActive })}
                title=${'Go to the ' + resources[account.origin].pageName}
                href=${resources[account.origin].uri(account.name)}
                target=${'_blank'}
              >
                <img src=${resources[account.origin].icon} class="imgUser" />
                ${account.name}
              </a>
              <button class="copy-button" title="copy ID" @click=${this._clickCopyHandler(account)}>
                <img src=${COPY} class="copy-icon" alt="copy button" />
              </button>
            </div>`
        )}
      </div>
    </div>`
  }
}
