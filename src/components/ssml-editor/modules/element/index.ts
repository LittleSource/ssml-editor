import type { CustomElement } from '../custom-types'
import { ElementType } from '../custom-types'
import PauseElement from './pause'
import DigitElement from './digit'
import PolyphoneElement from './polyphone'

export function existsElType(el: any) {
  return Object.values(ElementType).includes(el)
}

export const elements: Array<CustomElement> = [PauseElement, DigitElement, PolyphoneElement]
