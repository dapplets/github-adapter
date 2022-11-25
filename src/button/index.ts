import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { styles } from './button.css'
import { description } from './description'

export interface IButtonProps {
    img: string
    label: string
    loading: boolean
    disabled: boolean
    hidden: boolean
    tooltip: string
    isActive: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exec: (ctx: any, me: IButtonProps) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init: (ctx: any, me: IButtonProps) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ctx: any
    insPointName: string
}

export class Button extends LitElement implements IButtonProps {
    public static override styles = styles
    public static widgetParamsDescription = description
    public static contextInsPoints = {
        ISSUE_COMMENT: 'HEADER_BUTTONS',
    }

    @property() state
    @property() ctx
    @property() insPointName: string
    @property() img: string
    @property() label: string
    @property() loading: boolean
    @property() disabled: boolean
    @property() hidden: boolean
    @property() tooltip: string
    @property() isActive: boolean
    @property() exec: (ctx: any, me: IButtonProps) => Promise<void>
    @property() init: (ctx: any, me: IButtonProps) => void

    connectedCallback() {
        super.connectedCallback()
        this.init?.(this.ctx, this.state)
    }

    private _stateChanged: boolean = false

    private async _clickHandler(e: any) {
        e.stopPropagation()
        if (!this._stateChanged) this._stateChanged = true
        await this.exec?.(this.ctx, this.state)
        setTimeout(() => {
            this._stateChanged = false
        }, 2000)
    }

    override render() {
        if (this.hidden) return null

        return html`
            <div
                @click=${this._clickHandler}
                class="dapplet-widget-results ${this.isActive ? 'active' : 'inactive'} ${this
                    ._stateChanged
                    ? 'changed'
                    : ''}"
                title="${this.tooltip}"
            >
                <img src="${this.img}" />
                <div>${this.label}</div>
            </div>
        `
    }
}
