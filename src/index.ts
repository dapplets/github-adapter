import { IFeature } from '@dapplets/dapplet-extension'
import { AvatarBadge } from './avatar-badge'
import { Button } from './button'

type ContextBuilder = {
  [propName: string]: string
}
type Exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any
}

@Injectable
export default class GitHubAdapter {
  public exports = (): Exports => ({
    button: this.adapter.createWidgetFactory(Button),
    avatarBadge: this.adapter.createWidgetFactory(AvatarBadge),
  })
  public config = {
    ISSUE_COMMENT: {
      containerSelector: '.js-discussion.js-socket-channel',
      contextSelector: '.TimelineItem.js-comment-container',
      insPoints: {
        HEADER_BUTTONS: {
          selector: '.timeline-comment-actions',
          insert: 'end',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextBuilder: (searchNode: any): ContextBuilder => ({
        id: searchNode.querySelector('.timeline-comment-group')?.id,
        page: document.location.origin + document.location.pathname,
      }),
    },
    PROFILE: {
      containerSelector: '.js-profile-editable-replace',
      contextSelector: '',
      insPoints: {
        AVATAR: {
          selector: 'div.clearfix > div a',
          insert: 'inside',
        },
        AVATAR_BADGE: {
          selector: 'div.clearfix > div',
          insert: 'inside',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextBuilder: (el: any): ContextBuilder => ({
        el,
        id: el.querySelector('.vcard-username').textContent?.trim().split('\n')?.[0],
        authorFullname: el.querySelector('.vcard-fullname').textContent.trim(),
        authorUsername: el.querySelector('.vcard-username').textContent?.trim().split('\n')?.[0],
        authorImg: el.querySelector('.avatar').getAttribute('src'),
      }),
    },
  }

  constructor(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Inject('dynamic-adapter.dapplet-base.eth') readonly adapter: any
  ) {
    this.adapter.configure(this.config)
  }

  public attachConfig(feature: IFeature): void {
    this.adapter.attachConfig(feature)
  }

  public detachConfig(feature: IFeature): void {
    this.adapter.detachConfig(feature)
  }

  public getCurrentUser() {
    const headerProfileNode = document.querySelector(
      'body div.position-relative.js-header-wrapper > header > div.Header-item.mr-0 > details > summary > img'
    )
    if (!headerProfileNode)
      return {
        websiteName: 'GitHub',
      }
    const currentUser = {
      username: headerProfileNode.getAttribute('alt').slice(1),
      img: headerProfileNode.getAttribute('src'),
      websiteName: 'GitHub',
    }
    const profileNode = document.querySelector('.js-profile-editable-replace')
    if (profileNode) {
      const id = profileNode.querySelector('.vcard-username').textContent?.trim().split('\n')?.[0]
      if (id === currentUser.username) {
        currentUser.img = profileNode.querySelector('.avatar').getAttribute('src')
        currentUser['fullname'] = profileNode.querySelector('.vcard-fullname').textContent.trim()
      }
    }
    return currentUser
  }
}
