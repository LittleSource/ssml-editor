/**
 * @description parse elem html
 *
 */
import { Elements } from '../custom-types'

function parseHtmlConf() {
  const confList: any = []
  Elements.forEach((element) => {
    const conf = {
      selector: `span[data-w-e-type="${element.type}"]`,
      parseElemHtml: element.parseHtml,
    }
    confList.push(conf)
  })
  return confList
}
export default parseHtmlConf
