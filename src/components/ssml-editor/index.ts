import type { IModuleConf } from '@wangeditor/editor'
import withTag from './modules/module/plugin'
import { elemToHtmlConf, parseHtmlConf, renderElemConf } from './modules/module/render'
import { PauseMenuConf } from './modules/menus/PauseMenu'
import { DigitMenuConf } from './modules/menus/DigitMenu'
import { polyphoneMenuConf } from './modules/menus/polyphone'
import { elements } from './modules/element/index'

const ssmlModule: Partial<IModuleConf> = {
  menus: [PauseMenuConf, DigitMenuConf, polyphoneMenuConf],
  editorPlugin: withTag,
  renderElems: renderElemConf(elements),
  elemsToHtml: elemToHtmlConf(elements),
  parseElemsHtml: parseHtmlConf(elements),
}

export default ssmlModule
