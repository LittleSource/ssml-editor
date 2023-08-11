/* eslint-disable @typescript-eslint/ban-types */
import PauseElement from './element/pause'
import DigitElement from './element/digit'
import PolyphoneElement from './element/polyphone'

// 默认返回值
interface EmptyText {
  text: ''
}
/**
 * @description 自定义标签数据结构
 */
export interface CustomElement {
  type: string // 定义菜单类型值
  dataset: any
  children: EmptyText[] // void 元素必须有一个空 text,
  prefixCode?: string
  renderElem: Function
  parseHtml: Function
  elemToHtml?: Function
}

export const Elements: Array<CustomElement> = [PauseElement, DigitElement, PolyphoneElement]
