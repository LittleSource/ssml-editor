/*
 * @Date: 2022-07-10 13:22:34
 * @LastEditTime: 2023-04-13 21:11:42
 * @Description: 参考 https://www.wangeditor.com/v5/development.html#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%B8%B2%E6%9F%93%E6%96%B0%E5%85%83%E7%B4%A0
 */

import { Elements } from '../custom-types'

// 配置
function elemsToHtml() {
  const confList: any = []
  Elements.forEach((element) => {
    const conf = {
      type: element.type, // 节点 type ，重要！！！
      elemToHtml: element.elemToHtml, // 生成 html 的函数
    }
    confList.push(conf)
  })
  return confList
}

export default elemsToHtml
