import type { IDomEditor, IDropPanelMenu } from '@wangeditor/editor'
import { jr } from '../utils/transform'
import { ElementType } from '../enum/el-type'

class DigitMenu implements IDropPanelMenu {
  public title = ''
  public tag = ''
  public showDropPanel = false
  iconSvg: string

  constructor() {
    this.title = '数字读法'
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

  isDisabled(editor: IDomEditor): boolean {
    const selectionText = editor.getSelectionText()
    return jr(selectionText).length === 0
  }

  exec() {

  }

  // 定义 DropPanel 内部的 DOM Element
  getPanelContentElem(editor: IDomEditor): HTMLElement {
    const content = jr(editor.getSelectionText())

    const list = document.createElement('div')
    list.className = 'digit-box'

    content.forEach((e) => {
      const button = document.createElement('button')
      button.className = 'digit-box-item'
      button.dataset.id = `${new Date().getTime()}`
      button.dataset.value = e?.value
      button.dataset.alias = e?.alias
      button.dataset.interpret = e?.interpret
      button.textContent = `${e?.value}（读法：${e?.alias}）`
      list.appendChild(button)
    })

    list.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).tagName !== 'BUTTON')
        return
      const dataset = (e.target as HTMLElement).dataset
      dataset.type = ElementType.DIGIT
      dataset.content = editor.getSelectionText()
      this.insertTag(dataset, editor)
    })

    return list
  }

  insertTag = (dataset: object, editor: IDomEditor) => {
    const tagNode = {
      type: ElementType.DIGIT, // 唯一
      dataset,
      prefixCode: '', // 符号前缀
      style: {
        fontSize: '14px',
        // color: "#f00",
      },
      children: [{ text: '' }], // 必须有一个空 text 作为 children
    }
    if (editor) {
      editor.restoreSelection()
      editor.insertNode(tagNode)
      editor.move(1)
    }
  }
}

export const DigitMenuConf = {
  key: ElementType.DIGIT, // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new DigitMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  },
}
