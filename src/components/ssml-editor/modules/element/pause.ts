import type { VNode } from 'snabbdom'
import { h } from 'snabbdom'
import type { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
import { SlateTransforms } from '@wangeditor/editor'
import type { DOMElement } from '../module/dom'
import type { CustomElement } from '../custom-types'
import { ElementType } from '../enum/el-type'
import { jr } from '../utils/transform'
import { $tags } from '../menus/PauseMenu'

// 插入停顿
const PauseElement: CustomElement = {
  type: ElementType.PAUSE,
  dataset: {},
  children: [],
  renderElem: (el: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode => {
    const { dataset = {} } = el as CustomElement
    const vNode = h(
      `span.${dataset.type}-tag-inner`, // 定义class样式
      {
        props: {
          contentEditable: false, // 不可编辑
        },
        dataset,
        on: {
          click: (e: any) => {
            const target = e.currentTarget.parentNode
            updateEditorContent(target, dataset, editor)
          },
        },
      },
      `${dataset.alias}`,
    )
    return vNode
  },
  parseHtml: (elem: DOMElement, children: SlateDescendant[], editor: IDomEditor): SlateElement => {
    const rawInfo = decodeURIComponent(elem.getAttribute('data-info') || '')
    let info: any
    try {
      info = JSON.parse(rawInfo)
    }
    catch (ex) {
      info = rawInfo
    }
    return {
      type: info.type,
      dataset: info,
      children: [{ text: '' }], // void node 必须有一个空白 text
    } as unknown as CustomElement
  },
  elemToHtml: (elem: SlateElement, childrenHtml: string): string => {
    const { dataset = {}, type = '' } = elem as CustomElement
    const infoStr = encodeURIComponent(JSON.stringify(dataset))
    return `<span class="${dataset.type}-tag-inner" data-w-e-type="${type}" data-type="${type}"  data-w-e-is-void data-w-e-is-inline data-value="${dataset.value}" data-info="${infoStr}" time="${dataset.time}">${dataset.alias}</span>`
  },
}

function updateEditorContent(target: any, dataset: any, editor: IDomEditor) {
  const content = jr(dataset.content)
  const list = document.createElement('div')
  list.className = 'pause-editor-box'
  $tags.forEach((tag) => {
    const button = document.createElement('button')
    button.className = 'pause-editor-box-item'
    button.dataset.id = dataset.id
    button.dataset.value = String(tag.id)
    button.dataset.alias = tag.label
    button.dataset.time = tag.time
    button.dataset.type = dataset.type
    button.textContent = tag.label
    list.appendChild(button)
  })
  const button = document.createElement('button')
  button.className = 'pause-editor-box-item'
  button.setAttribute('style', 'justify-content:center')
  button.dataset.type = dataset.type
  button.dataset.id = dataset.id
  button.dataset.value = dataset.value
  button.dataset.alias = 'remove'
  button.textContent = '移除'
  list.appendChild(button)

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

    const nodeList = newChildrenList.map((item, index) => {
      const child: any = Object.assign({}, item)
      const childList = child.children.map((c: any) => {
        if (c.type === data.type && c.dataset.id === data.id) {
          if (data.alias === 'remove')
            return { text: '' }

          const t = Object.assign({}, c)
          t.dataset = Object.assign({}, data)
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
  target.appendChild(list)
  document.addEventListener('click', (e) => {
    if (!target.contains(e.target))
      list.remove()
  })
}

export default PauseElement
