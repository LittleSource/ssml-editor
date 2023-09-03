import type { IDomEditor, IDropPanelMenu } from '@wangeditor/editor'
import { ElementType } from '../custom-types'

export const $tags = [
  { id: 0, label: '连续', time: '50ms' },
  { id: 1, label: '停顿(0.5秒)', time: '500ms' },
  { id: 2, label: '停顿(1秒)', time: '1000ms' },
  { id: 3, label: '停顿(2秒)', time: '2000ms' },
]

class PauseMenu implements IDropPanelMenu {
  public title = ''
  public tag = ''
  public showDropPanel = false
  iconSvg: string

  constructor() {
    this.title = '插入停顿'
    this.iconSvg = ''
    this.tag = 'button'
    this.showDropPanel = true
  }

  isActive(): boolean {
    return false
  }

  getValue(): string | boolean {
    return ''
  }

  isDisabled(): boolean {
    return false
  }

  exec() {

  }

  // 定义 DropPanel 内部的 DOM Element
  getPanelContentElem(editor: IDomEditor): Element {
    const list = document.createElement('div')
    list.className = 'pause-box'

    $tags.forEach((tag) => {
      const button = document.createElement('button')
      button.className = 'pause-box-item'
      button.dataset.id = `${new Date().getTime()}`
      button.dataset.value = String(tag.id)
      button.dataset.alias = tag.label
      button.dataset.time = tag.time
      button.textContent = tag.label
      list.appendChild(button)
    })

    list.addEventListener('click', (e: Event) => {
      // 修改为箭头函数
      if ((e.target as HTMLElement).tagName !== 'BUTTON')
        return
      const dataset = (e.target as HTMLElement).dataset
      dataset.type = ElementType.PAUSE
      this.insertTag(dataset, editor)
    })

    return list
  }

  insertTag = (dataset: object, editor: IDomEditor) => {
    const tagNode = {
      type: ElementType.PAUSE, // 唯一
      dataset,
      prefixCode: '', // 符号前缀
      children: [{ text: '' }], // 必须有一个空 text 作为 children
    }
    if (editor) {
      editor.restoreSelection()
      editor.insertNode(tagNode)
      editor.move(1)
    }
  }
}

export const PauseMenuConf = {
  key: ElementType.PAUSE,
  factory() {
    return new PauseMenu()
  },
}
