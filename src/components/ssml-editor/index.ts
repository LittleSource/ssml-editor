import type { IModuleConf } from '@wangeditor/editor'
import withTag from './modules/module/plugin'
import renderElemConf from './modules/module/render-elem'
import elemToHtmlConf from './modules/module/elem-to-html'
import parseHtmlConf from './modules/module/parse-elem-html'
import { PauseMenuConf } from './modules/menus/PauseMenu'
import { DigitMenuConf } from './modules/menus/DigitMenu'
import { polyphoneMenuConf } from './modules/menus/polyphone'

const ssmlModule: Partial<IModuleConf> = {
  menus: [PauseMenuConf, DigitMenuConf, polyphoneMenuConf],
  editorPlugin: withTag,
  renderElems: renderElemConf(),
  elemsToHtml: elemToHtmlConf(),
  parseElemsHtml: parseHtmlConf(),
}

export default ssmlModule
