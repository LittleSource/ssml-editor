import type { VNode } from 'snabbdom'
import { h } from 'snabbdom'
import type { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
import { SlateTransforms } from '@wangeditor/editor'
import type { DOMElement } from '../module/dom'
import { ElementType } from '../custom-types'
import type { CustomElement } from '../custom-types'
import type { PolyphoneData } from '../utils/pinyin'
import { getElement, getPolyphoneData } from '../utils/pinyin'

// 多音字
const PolyphoneEle: CustomElement = {
  type: ElementType.POLYPHONE,
  dataset: {},
  children: [],
  renderElem: (elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode => {
    const updateEditorContent = (target: any, originWord: string, id: number, editor: IDomEditor) => {
      const list = document.createElement('div')
      list.className = 'polyphone-editor-box'
      getPolyphoneData(originWord).forEach((item: PolyphoneData) => {
        const itemElem = getElement(item, id, () => { })
        itemElem.className = 'polyphone-editor-box-item'
        list.appendChild(itemElem)
      })

      const button = document.createElement('button')
      button.className = 'polyphone-editor-box-item'
      button.setAttribute('style', 'justify-content:center')
      button.dataset.value = '移除'
      button.dataset.interpret = 'remove'
      button.textContent = '移除'
      list.addEventListener('click', (e: Event) => {
        if ((e.target as HTMLElement).tagName !== 'BUTTON')
          return
        const data = (e.target as HTMLElement).dataset
        const childrenList = editor.children
        const newChildrenList = childrenList.map((child: any) => {
          const list = child.children.filter((item: any) => {
            return item.text !== ''
          })
          return Object.assign({}, child, { children: list })
        })

        const nodeList = newChildrenList.map((item) => {
          const child: any = Object.assign({}, item)
          const childList = child.children.map((c: any) => {
            // eslint-disable-next-line eqeqeq
            if (c.type == 'polyphone' && c.id == id) {
              if (data.interpret === 'remove')
                return { text: originWord }

              const t = Object.assign({}, c)
              t.id = data.id
              t.pinyin = data.pinyin
              t.pinyinShow = data.pinyinShow
              t.originWord = data.originWord
              return t
            }
            return c
          })
          return Object.assign({}, item, { children: childList })
        })
        target.remove(list)
        SlateTransforms.removeNodes(editor)
        SlateTransforms.insertNodes(editor, nodeList)
        editor.updateView()
      })
      list.appendChild(button)
      target.appendChild(list)
      document.addEventListener('click', (e) => {
        if (!target.contains(e.target))
          list.remove()
      })
    }

    // 当前节点是否选中
    // const selected = DomEditor.isNodeSelected(editor, elem);

    // 构建
    const { pinyinShow = '', originWord = '', id = 0 } = elem as PolyphoneElement
    const vnode = h(
      'span',
      {
        props: {
          contentEditable: false, // 不可编辑
        },
        style: {
          margin: '0px 1px',
          borderBottom: '3px solid #ffdcb1',
          cursor: 'pointer',
        },
        on: {
          click: (e: any) => {
            const target = e.currentTarget.parentNode
            updateEditorContent(target, originWord, id, editor)
          },
        },
      },
      [
        originWord,
        h(
          'span',
          {
            style: {
              backgroundColor: '#ffdcb1',
              padding: '0 5px',
            },
          },
          [pinyinShow],
        ),
      ],
    )

    return vnode
  },
  parseHtml: (domElem: DOMElement, children: SlateDescendant[], editor: IDomEditor): SlateElement => {
    const pinyin = domElem.getAttribute('data-pinyin') || ''
    const pinyinShow = domElem.getAttribute('data-pinyinShow') || ''
    const originWord = domElem.getAttribute('data-originWord') || ''
    const id = domElem.getAttribute('data-id') || '0'

    const node: PolyphoneElement = {
      type: 'polyphone',
      id: Number.parseInt(id),
      originWord,
      pinyin,
      pinyinShow,
      children: [{ text: '' }], // void node 必须有 children ，其中有一个空字符串，重要！！！
    }

    return node
  },
  elemToHtml: (elem: SlateElement, childrenHtml: string): string => {
    const { pinyin = '', originWord = '', pinyinShow = '', id = 0 } = elem as PolyphoneElement
    // 生成 HTML 代码
    return `<span
  class="polyphone"
  data-w-e-type="polyphone"
  data-w-e-is-void
  data-w-e-is-inline
  data-pinyin="${pinyin}"
  data-pinyinShow="${pinyinShow}"
  data-originWord="${originWord}"
  data-id="${id}"
>${originWord}</span>`
  },
}

export default PolyphoneEle
