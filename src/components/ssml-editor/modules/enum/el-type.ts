/**
 * 定义标签类型
 */
export enum ElementType {
  PAUSE = 'pause', // 插入停顿
  DIGIT = 'digit', // 数字符号
  PINYIN = 'polyphoneMenu',
}

interface EmptyText {
  text: ''
}

export interface PolyphoneElement {
  id: number
  type: 'polyphone'
  originWord: string
  pinyin: string
  pinyinShow: string
  children: EmptyText[]
}

export function existsElType(el: any) {
  return Object.values(ElementType).includes(el)
}
