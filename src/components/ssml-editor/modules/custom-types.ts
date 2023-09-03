/* eslint-disable @typescript-eslint/ban-types */
interface EmptyText {
  text: ''
}

export enum ElementType {
  PAUSE = 'pause', // 插入停顿
  DIGIT = 'digit', // 数字符号
  POLYPHONE = 'polyphone', // 多音字
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
