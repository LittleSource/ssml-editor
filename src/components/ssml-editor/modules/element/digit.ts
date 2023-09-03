import type { VNode } from 'snabbdom'
import { h } from 'snabbdom'
import type { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
import { SlateTransforms } from '@wangeditor/editor'
import type { DOMElement } from '../module/dom'
import { ElementType } from '../custom-types'
import type { CustomElement } from '../custom-types'
import { jr } from '../utils/transform'

// 数字符号
const DigitElement: CustomElement = {
  type: ElementType.DIGIT,
  dataset: {},
  children: [],
  renderElem: (el: SlateElement, children: VNode[] | null, editor: IDomEditor, element: CustomElement): VNode => {
    const { dataset = {} } = el as CustomElement
    const vNode = h('span', [
      h(
        `span.${dataset.type}-tag-inner`,
        {
          props: {
            contentEditable: false, // 不可编辑
          },
          dataset,
        },
        `${dataset.content}`,
      ),
      h(
        `button.${dataset.type}-button-inner`,
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
        `${dataset.value}`,
      ),
    ])
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
    const { type = '', dataset = {} } = elem as CustomElement
    const infoStr = encodeURIComponent(JSON.stringify(dataset))
    return `<span class="${dataset.type}-tag-inner" data-w-e-type="${type}" data-type="${type}"  data-w-e-is-void data-w-e-is-inline data-value="${dataset.value}" data-info="${infoStr}">${dataset.content}</span>`
  },
}

function updateEditorContent(target: any, dataset: any, editor: IDomEditor) {
  const content = jr(dataset.content)
  const list = document.createElement('div')
  list.className = 'digit-editor-box'
  content.forEach((c) => {
    const button = document.createElement('button')
    button.className = 'digit-editor-box-item'
    button.dataset.type = dataset.type
    button.dataset.id = dataset.id
    button.dataset.value = c?.value
    button.dataset.alias = c?.alias
    button.dataset.interpret = c?.interpret
    button.dataset.content = dataset.content
    button.textContent = `${c?.value}（读法：${c?.alias}）`
    list.appendChild(button)
  })
  const button = document.createElement('button')
  button.className = 'digit-editor-box-item'
  button.setAttribute('style', 'justify-content:center')
  button.dataset.type = dataset.type
  button.dataset.id = dataset.id
  button.dataset.value = '移除'
  button.dataset.alias = '移除'
  button.dataset.interpret = 'remove'
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
          if (data.interpret === 'remove')
            return { text: dataset.content }

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

export default DigitElement
