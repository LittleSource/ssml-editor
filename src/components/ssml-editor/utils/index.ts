export interface InputData {
  text: string
  ssml: string
  length: number
}
// 计算字符串的长度，不论中文和数字都按1个字符计算，英文按单词计算，空格和全角半角标点符号不计算
export function getStrLength(str: string): number {
  // 将字符串按照空格或标点符号进行分割，得到一个单词数组
  const words = str.split(/[\s\p{P}]+/u)
  let count = 0
  for (const word of words) {
    // 判断是否全部由字母组成
    if (/^[a-zA-Z]+$/.test(word))
      count++
  }
  // 计算中文和数字的个数，将其加到计数器上
  count += str.match(/[\u4E00-\u9FA5\d]/g)?.length || 0
  return count
}

export function parseSSML(data: any[], length: number = Number.MAX_SAFE_INTEGER): InputData {
  const res: InputData = {
    ssml: '',
    text: '',
    length: 0,
  }
  for (let index = 0; index < data.length; index++) {
    const children = data[index].children
    for (let i = 0; i < children.length; i++) {
      if (!children[i].type) {
        // 去掉字符串中的回车换行
        const formatText = children[i].text.replace(/[\n]/g, '')
        if (formatText.length <= 0)
          continue

        const formatTextLegth = getStrLength(formatText)
        const diff = res.length + formatTextLegth - length
        if (diff > 0) {
          const text = res.text.length === 0 ? formatText.slice(0, length) : formatText.slice(0, length - diff - 1)
          res.text += text
          res.ssml += text
          res.length += formatTextLegth
          break
        }
        res.ssml += formatText
        res.text += formatText
        res.length += formatTextLegth
        continue
      }
      switch (children[i].type) {
        case 'digit':
          res.ssml += `<say-as interpret-as="${children[i].dataset.interpret}">${children[i].dataset.content}</say-as>`
          res.text += children[i].dataset.content
          res.length += children[i].dataset.content.length
          break
        case 'pause':
          res.ssml += `<break time="${children[i].dataset.time}"/>`
          break
        case 'polyphone':
          res.ssml += `<phoneme alphabet="py" ph="${children[i].pinyin}"> ${children[i].originWord} </phoneme>`
          res.text += children[i].originWord
          res.length += 1
          break
      }
      if (res.length >= length)
        break
    }
  }
  return res
}
