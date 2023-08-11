import type { IModuleConf } from '@wangeditor/editor'
import { PauseMenuConf } from '../menus/PauseMenu'
import { DigitMenuConf } from '../menus/DigitMenu'
import { polyphoneMenuConf } from '../menus/polyphone'
import withTag from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'
import parseHtmlConf from './parse-elem-html'

const ssmlModule: Partial<IModuleConf> = {
  menus: [PauseMenuConf, DigitMenuConf, polyphoneMenuConf],
  editorPlugin: withTag,
  renderElems: renderElemConf(),
  elemsToHtml: elemToHtmlConf(),
  parseElemsHtml: parseHtmlConf(),
}

export default ssmlModule
