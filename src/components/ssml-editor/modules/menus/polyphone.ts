import type { IDomEditor, IDropPanelMenu } from '@wangeditor/editor'
import type { PolyphoneElement } from '../enum/el-type'
import { ElementType } from '../enum/el-type'
import type { PolyphoneData } from '../utils/pinyin'
import { convertSoftlyTo5, getElement, getPolyphoneData } from '../utils/pinyin'

export default class PolyphoneMenu implements IDropPanelMenu {
  public title = ''
  public tag = 'button'
  public showDropPanel = true
  public iconSvg = ''
  private polyphoneData: PolyphoneData[] = []

  constructor() {
    this.title = '多音字'
    this.tag = 'button'
    this.showDropPanel = true
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(): boolean {
    return false
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(): string | boolean {
    return ''
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {
    return !this.hasPolyphone(editor)
  }

  // 点击菜单时触发的函数
  exec() {
    // TS 语法
    // exec(editor, value) {                              // JS 语法
    // DropPanel menu ，这个函数不用写，空着即可
  }

  // 定义 DropPanel 内部的 DOM Element
  getPanelContentElem(editor: IDomEditor): Element {
    if (this.polyphoneData.length === 0)
      return document.createElement('div')

    const list = document.createElement('div')
    list.className = 'pause-box'

    this.polyphoneData.forEach((item) => {
      const id = new Date().getTime()
      const itemElem = getElement(item, id, (_, pinyinShow) => {
        const node: PolyphoneElement = {
          type: 'polyphone',
          id,
          originWord: item.word,
          pinyin: convertSoftlyTo5(item.pinyin),
          pinyinShow,
          children: [{ text: '' }],
        }
        editor.restoreSelection()
        editor.insertNode(node)
        editor.move(1)
      })
      list.appendChild(itemElem)
    })
    this.polyphoneData = []
    return list
  }

  private hasPolyphone(editor: IDomEditor): boolean {
    const selectionText = editor.getSelectionText()
    if (selectionText.length === 1 && selectionText.match(/[\u4E00-\u9FA5]/))
      return this.getPolyphoneData(selectionText).length > 0
    else
      return false
  }

  private getPolyphoneData(word: string): PolyphoneData[] {
    this.polyphoneData = getPolyphoneData(word)
    return this.polyphoneData
  }
}

export const polyphoneMenuConf = {
  key: ElementType.PINYIN,
  factory() {
    return new PolyphoneMenu()
  },
}
