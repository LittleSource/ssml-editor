import { polyphonic } from 'pinyin-pro'
import pinyinize from 'pinyinize'

export interface PolyphoneData {
  word: string
  pinyin: string
}

export function getPolyphoneData(word: string) {
  let polyphoneData: PolyphoneData[] = []
  const res = polyphonic(word, { type: 'array', toneType: 'num' })
  if (res[0] && res[0].length > 1) {
    polyphoneData = res[0].map((item) => {
      return {
        word,
        pinyin: item,
      }
    })
  }
  return polyphoneData
}

// 判断是否是轻声音调
function isSoftly(pinyin: string) {
  return pinyin[pinyin.length - 1] === '0'
}

// 轻声音调表示方法如果末位为0转换为5
export function convertSoftlyTo5(pinyin: string) {
  return isSoftly(pinyin) ? `${pinyin.slice(0, pinyin.length - 1)}5` : pinyin
}

export function clearSoftly0(pinyin: string) {
  return isSoftly(pinyin) ? pinyin.slice(0, pinyin.length - 1) : pinyin
}

export function getElement(data: PolyphoneData, id: number, onclick: (e: Event, pinyinShow: string) => void) {
  const pinyin = clearSoftly0(data.pinyin)
  const pinyinShow = pinyinize(pinyin)
  const ssmlPinyin = convertSoftlyTo5(data.pinyin)

  const itemElem = document.createElement('button')
  itemElem.className = 'pause-box-item'
  itemElem.style.fontSize = 'inherit'
  itemElem.innerText = pinyinShow
  itemElem.dataset.id = id.toString()
  itemElem.dataset.originWord = data.word
  itemElem.dataset.pinyinShow = pinyinShow
  itemElem.dataset.pinyin = ssmlPinyin
  itemElem.onclick = e => onclick(e, pinyinShow)
  return itemElem
}
