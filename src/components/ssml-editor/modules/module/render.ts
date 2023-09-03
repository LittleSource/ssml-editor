export function elemToHtmlConf(element: any[]) {
  const confList: any = []
  element.forEach((ele) => {
    const conf = {
      type: ele.type, // 节点 type ，重要！！！
      elemToHtml: ele.elemToHtml, // 生成 html 的函数
    }
    confList.push(conf)
  })

  return confList
}

export function renderElemConf(elements: any[]) {
  const confList: any = []
  elements.forEach((ele) => {
    const conf = {
      type: ele.type, // 节点 type
      renderElem: ele.renderElem,
    }
    confList.push(conf)
  })
  return confList
}

export function parseHtmlConf(element: any[]) {
  const confList: any = []
  element.forEach((ele) => {
    const conf = {
      selector: `span[data-w-e-type="${ele.type}"]`,
      parseElemHtml: ele.parseHtml,
    }
    confList.push(conf)
  })
  return confList
}
