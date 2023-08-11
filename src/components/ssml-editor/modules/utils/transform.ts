/* eslint-disable eslint-comments/no-unlimited-disable */
// 此文件禁用所有 eslint规则
/* eslint-disable */
const pr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const hr = ['零', '幺', '二', '三', '四', '五', '六', '七', '八', '九']
const vr = ['', '万', '亿', '万亿', '万万亿']
const gr = ['', '十', '百', '千']
const Cr = '0|[1-9]\\d{0,15}|[1-9]\\d{0,2}([,，]\\d{3}){0,5}'
const Ar = '('.concat(Cr, ')(\\.\\d{0,10})?')
const wr = '[+-]?'.concat(Ar)
const xr = '[+-]?('.concat(Cr, ')(\\.0+)')
const _r = '\\d{7}|\\d{8}|\\d{3}[\\s-]\\d{4}|\\d{4}[\\s-]\\d{4}'
const Tr = '010|02\\d|03\\d{2}|04\\d{2}|05\\d{2}|06\\d{2}|07\\d{2}|08\\d{2}|09\\d{2}'
const Sr = '-|转|分机|分机号'
const Dr = '\\d{1,4}'
const Or = '[1-9]\\d{0,3}'
const Nr = '1[0-2]|0?[1-9]'
const Fr = '3[0-1]|[1-2][0-9]|0?[1-9]'
const Br = '[-、\\./]'
const Rr = '(1[0-2]|0?\\d)[：:][0-5]\\d([：:][0-5]\\d)?(P\\.?M?\\.?|A\\.?M?\\.?)|((2[0-4]|1\\d|0?\\d)[：:][0-5]\\d([：:][0-5]\\d)?)'
const Ir = {
  RMB: '人民币',
  CNY: '元',
  HKD: '港币',
  MOP: '澳门元',
  TWD: '新台币',
  USD: '美元',
  EUR: '欧元',
  JPY: '日元',
  GBP: '英镑',
  CAD: '加元',
  AUD: '澳元',
  CHF: '瑞士法郎',
  SEK: '瑞典克朗',
  NOK: '挪威克朗',
  SUR: '俄罗斯卢布',
  INR: '印度卢比',
  SGD: '新加坡元',
  KRW: '韩元',
  THB: '泰铢',
  PHP: '菲律宾比索',
  IDR: '印尼盾',
  MYR: '马来西亚林吉特',
  VND: '越南盾',
  NZD: '新西兰元',
  BRL: '巴西雷亚尔',
  SNR: '沙特里亚尔',
  TRY: '土耳其里拉',
}
const Pr = {
  'nm': '纳米',
  'μm': '微米',
  'mm': '毫米',
  'cm': '厘米',
  'm': '米',
  'km': '千米',
  'in': '英寸',
  'ft': '英尺',
  'mi': '英里',
  'mile': '英里',
  'yd': '码',
  'μg': '微克',
  'mg': '毫克',
  'g': '克',
  'kg': '千克',
  't': '吨',
  'ct': '克拉',
  'lb': '磅',
  'oz': '盎司',
  'mm\xB2': '平方毫米',
  'cm\xB2': '平方厘米',
  '㎡': '平方米',
  'km\xB2': '平方千米',
  'ha': '公顷',
  'are': '公亩',
  'in\xB2': '平方英寸',
  'ft\xB2': '平方英尺',
  'yd\xB2': '平方码',
  'mi\xB2': '平方英里',
  'mile\xB2': '平方英里',
  'cm\xB3': '立方厘米',
  'm\xB3': '立方米',
  'km\xB3': '立方千米',
  'yd\xB3': '立方码',
  'in\xB3': '立方英寸',
  'ft\xB3': '立方英尺',
  'μl': '微升',
  'ml': '毫升',
  'l': '升',
  'gal': '加仑',
  '℉': '华氏度',
  '℃': '摄氏度',
  'Pa': '帕',
  'KPa': '千帕',
  'MPa': '兆帕',
  'mmHg': '毫米汞柱',
  'atm': '标准大气压',
  'W': '瓦',
  'kW': '千瓦',
  'J/s': '焦耳每秒',
  'J': '焦',
  'KJ': '千焦',
  'cal': '卡',
  'kcal': '大卡',
  'kW\xB7h': '千瓦时',
  'g/cm\xB3': '克每立方厘米',
  'kg/cm\xB3': '千克每立方厘米',
  'kg/m\xB3': '千克每立方米',
  'N': '牛',
  'kN': '千牛',
  'ns': '纳秒',
  'μs': '微秒',
  'ms': '毫秒',
  's': '秒',
  'min': '分',
  'h': '小时',
  'week': '周',
  'y': '年',
  'yr': '年',
  'm/s': '米每秒',
  'km/h': '千米每小时',
  'mile/h': '英里每小时',
  'mach': '马赫',
  'bit': '比特',
  'b': '字节',
  'B': '字节',
  '\xB0': '度',
  '\'': '分',
}
const kr = [
  {
    type: 'telephone',
    name: '电话',
    regex: /(1\d{2})([\s-])?(\d{4})\2(\d{4})/,
    normalize(t: any, e: any[]) {
      const n = [e[1], e[3], e[4]]
      return n
        .map((t) => {
          return yr(t, hr)
        })
        .join('　')
    },
  },
  {
    type: 'telephone',
    name: '电话',
    regex: /(1\d{2})([\s-])?(\d{3})\2(\d{5})/,
    normalize(t: any, e: any[]) {
      const n = [e[1], e[3], e[4]]
      return n
        .map((t) => {
          return yr(t, hr)
        })
        .join('　')
    },
  },
  {
    type: 'telephone',
    name: '电话',
    regex: new RegExp(
      '^((('.concat(Tr, ')|\\((').concat(Tr, ')\\))[\\s-]?)?(').concat(_r, ')((').concat(Sr, ')(').concat(Dr, '))?$'),
    ),
    normalize(t: any, e: any[]) {
      let n = ''
      return (
        e[2] && (n += ''.concat(yr(e[2].replace(/\(\)/, ''), hr), '　')),
        (n += br(e[5])),
        e[6] && ((n += ' '), (n += e[7] === '-' ? '转' : e[7]), (n += yr(e[8], hr))),
        n
      )
    },
  },
  {
    type: 'telephone',
    name: '电话',
    regex: /^\d{3,5}$/,
    normalize(t: any) {
      return yr(t, hr)
    },
  },
  {
    type: 'telephone',
    name: '电话',
    regex: /^(400|800)(-)?(\d{3})\2(\d{4})$/,
    normalize(t: any, e: any[]) {
      return [yr(e[1], hr), yr(e[3], hr), yr(e[4], hr)].join(' ')
    },
  },
  {
    type: 'date',
    name: '日期',
    regex: new RegExp('^('.concat(Or, ')').concat(Br, '(').concat(Nr, ')$')),
    normalize(t: any, e: any[]) {
      return ''.concat(yr(e[1], pr), '年').concat(mr(e[2]), '月')
    },
  },
  {
    type: 'date',
    name: '日期',
    regex: new RegExp('^('.concat(Nr, ')').concat(Br, '(').concat(Fr, ')$')),
    normalize(t: any, e: any[]) {
      return ''.concat(mr(e[1]), '月').concat(mr(e[2]), '日')
    },
  },
  {
    type: 'date',
    name: '日期',
    regex: new RegExp('^('.concat(Or, ')(').concat(Br, ')(').concat(Nr, ')\\2(').concat(Fr, ')$')),
    normalize(t: any, e: any[]) {
      return ''.concat(yr(e[1], pr), '年').concat(mr(e[3]), '月').concat(mr(e[4]), '日')
    },
  },
  {
    type: 'date',
    name: '日期',
    regex: new RegExp('^('.concat(Or, ')(').concat(Br, ')(').concat(Nr, ')[-~](').concat(Or, ')\\2(').concat(Nr, ')$')),
    normalize(t: any, e: any[]) {
      return ''.concat(yr(e[1], pr), '年').concat(mr(e[3]), '月至').concat(yr(e[4], pr), '年').concat(mr(e[5]), '月')
    },
  },
  {
    type: 'date',
    name: '日期',
    regex: new RegExp('^('.concat(Nr, ')(').concat(Br, ')(').concat(Fr, ')[-~](').concat(Nr, ')\\2(').concat(Fr, ')$')),
    normalize(t: any, e: any[]) {
      return ''.concat(mr(e[1]), '月').concat(mr(e[3]), '日至').concat(mr(e[4]), '月').concat(mr(e[5]), '日')
    },
  },
  {
    type: 'date',
    name: '日期',
    regex: new RegExp(
      '^('
        .concat(Or, ')(')
        .concat(Br, ')(')
        .concat(Nr, ')\\2(')
        .concat(Fr, ')[-~](')
        .concat(Or, ')\\2(')
        .concat(Nr, ')\\2(')
        .concat(Fr, ')$'),
    ),
    normalize(t: any, e: any[]) {
      return ''
        .concat(yr(e[1], pr), '年')
        .concat(mr(e[3]), '月')
        .concat(mr(e[4]), '日至')
        .concat(yr(e[5], pr), '年')
        .concat(mr(e[6]), '月')
        .concat(mr(e[7]), '日')
    },
  },
  {
    type: 'time',
    name: '时间',
    regex: new RegExp('^'.concat(Rr, '$'), 'i'),
    normalize(t: string) {
      return Er(t)
    },
  },
  {
    type: 'time',
    name: '时间段',
    regex: new RegExp('^('.concat(Rr, ')[-~](').concat(Rr, ')$'), 'i'),
    normalize(t: string) {
      const e = t.split(/[-~]/)
      return ''.concat(Er(e[0]), '到').concat(Er(e[1]))
    },
  },
  {
    type: 'currency',
    name: '货币',
    regex: new RegExp('^('.concat(Ar, ')(').concat(Object.keys(Ir).join('|'), ')$'), 'i'),
    normalize(t: any, e: string[]) {
      return ''.concat(mr(e[1].replace(/,/g, ''))).concat(Ir[e[5].toUpperCase() as keyof typeof Ir])
    },
  },
  {
    type: 'measure',
    name: '单位',
    regex: new RegExp('^('.concat(Ar, ')(').concat(Object.keys(Pr).join('|'), ')$')),
    normalize(t: any, e: string[]) {
      return ''.concat(mr(e[1].replace(/,/g, ''))).concat(Pr[e[5] as keyof typeof Pr])
    },
  },
  {
    type: 'fraction',
    name: '分数',
    regex: /^(0|[1-9]\d{0,15})\/(0|[1-9]\d{0,15})$/,
    normalize(t: string) {
      const e = t.split('/')
      return ''.concat(mr(e[1]), '分之').concat(mr(e[0]))
    },
  },
  {
    type: 'score',
    name: '比分',
    regex: /^0*(0|[1-9]\d{0,15})[：:/-]0*(0|[1-9]\d{0,15})$/,
    normalize(t: any, e: any[]) {
      return ''.concat(mr(e[1]), '比').concat(mr(e[2]))
    },
  },
  {
    type: 'cardinal',
    name: '数值',
    regex: new RegExp('^'.concat(wr, '$')),
    normalize(t: string) {
      return mr(t.replace(/[,，]/g, ''))
    },
  },
  {
    type: 'cardinal',
    name: '数值',
    regex: new RegExp('^'.concat(xr, '$')),
    normalize(t: string) {
      return mr(t.replace(/[,，]/g, ''), !0)
    },
  },
  {
    type: 'digits',
    name: '序列',
    regex: /^\d{2,}$/,
    normalize(t: any) {
      return yr(t, pr)
    },
  },
]
function br(t: string) {
  if (/[ -]/.test(t)) {
    const e = t.split(/[ -]/)
    return e
      .map((t) => {
        return yr(t, hr)
      })
      .join(' ')
  }
  return t.length === 7
    ? ''.concat(yr(t.substring(0, 3), hr), ' ').concat(yr(t.substring(3), hr))
    : ''.concat(yr(t.substring(0, 4), hr), ' ').concat(yr(t.substring(4), hr))
}
function mr(t: string | number, extra?: any) {
   
  const e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
  if (isNaN(Number(t)))
    throw new Error('not a valid number')
  let n
  const r = t.toString()
  const o = /^[+-]/.test(r)
  const a = r.charAt(0) === '-'
  const i = r.substring(o ? 1 : 0).split('.')
  const u = i
  const s = u[0]
  const c = u[1]
  const l = a ? '负' : ''
  let f = ''
  let d = ''
  const p = []
  let h = []
  const v = sr(s.split('').reverse())
  try {
    for (v.s(); !(n = v.n()).done;) {
      const g = n.value
      h.unshift(g), h.length === 4 && (p.unshift(h), (h = []))
    }
  }
  catch (D) {
    v.e(D)
  }
  finally {
    v.f()
  }
  h.length && p.unshift(h)
  for (let m = !1, y = 0, E = p.length; y < E; y++) {
    const C = p[y]
    let A = !1
    if (
      C.every((t) => {
        return t === '0'
      })
    ) { m = !0 }
    else {
      m && (f += '零')
      for (let w = 0, x = C.length; w < x; w++) {
        C[w] === '0'
          ? (A = !0)
          : (A && !m && (f += '零'),
            (A = !1),
            (m = !1),
            (f
              += x === 2 && w === 0 && C[w] === '1'
                ? gr[x - w - 1]
                : (x === 4 && w === 0 && C[w] === '2') || (E > 1 && y < E - y && x === 1 && C[w] === '2')
                    ? '两'.concat(gr[x - w - 1])
                    : pr[C[w]] + gr[x - w - 1]))
      }
      f += vr[E - y - 1]
    }
  }
  if (
    (f || (f = '零'),
    c
      && (e
        || c.split('').some((t: string) => {
          return t !== '0'
        })))
  ) {
    d += '点'
    let _
    const T = sr(c)
    try {
      for (T.s(); !(_ = T.n()).done;) {
        const S = _.value
        d += pr[S]
      }
    }
    catch (D) {
      T.e(D)
    }
    finally {
      T.f()
    }
  }
  return l + f + d
}
function yr(t: any, e: any) {
  return Array.from(t)
    .map((t) => {
      return e[t as keyof typeof e]
    })
    .join('')
}
function Er(t: string) {
  let e = ''
  if (/(P\.?M?\.?|A\.?M?\.?)$/i.test(t)) {
    const n = t.split(/[APM.]+/i);
    (e
      = t
        .substr(n[0].length - t.length)
        .toUpperCase()
        .charAt(0)
      === 'A'
        ? '上午'
        : '下午'),
    (t = n[0])
  }
  const r = t.split(/[:：]/)
  r.length < 3 && r.push('00')
  const o = +r[0]
  const a = +r[1]
  const i = +r[2]
  e === '上午' && o === 12
    ? (e = '中午')
    : (e === '上午' && o < 6) || (e === '下午' && (o === 12 || o === 0))
        ? (e = '凌晨')
        : e === '下午' && o >= 7 && (e = '晚上')
  let u = ''.concat(e).concat(o === 2 ? '两' : mr(o), '点')
  return (
    a === 0 ? i !== 0 && (u += '过') : (u += ''.concat(a === 2 ? '两' : mr(a), '分')),
    i !== 0 && (u += ''.concat(i === 2 ? '两' : mr(i), '秒')),
    e && a === 0 && i === 0 && (u += '整'),
    u
  )
}
function sr(t: any, e?: any) {
  let n = (typeof Symbol !== 'undefined' && t[Symbol.iterator]) || t['@@iterator']
  if (!n) {
    if (Array.isArray(t) || (n = cr(t)) || (e && t && typeof t.length === 'number')) {
      n && (t = n)
      let r = 0
      const o = function () {}
      return {
        s: o,
        n() {
          return r >= t.length
            ? {
                done: !0,
              }
            : {
                done: !1,
                value: t[r++],
              }
        },
        e(t: any) {
          throw t
        },
        f: o,
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    )
  }
  let a: any
  let i = !0
  let u = !1
  return {
    s() {
      n = n.call(t)
    },
    n() {
      const t = n.next()
      return (i = t.done), t
    },
    e(t: any) {
      (u = !0), (a = t)
    },
    f() {
      try {
        i || n.return == null || n.return()
      }
      finally {
        if (u)
          throw a
      }
    },
  }
}
function cr(t: any, e?: any) {
  if (t) {
    if (typeof t === 'string')
      return lr(t, e)
    let n = Object.prototype.toString.call(t).slice(8, -1)
    return (
      n === 'Object' && t.constructor && (n = t.constructor.name),
      n === 'Map' || n === 'Set'
        ? Array.from(t)
        : n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? lr(t, e)
          : void 0
    )
  }
}
function lr(t: any, e: any) {
  (e == null || e > t.length) && (e = t.length)
  for (let n = 0, r = new Array(e); n < e; n++) {
    r[n] = t[n]
    return r
  }
}

export function jr(t: string) {
  return kr
    .map((e) => {
      const n = e.regex.exec(t)
      return n && n[0] === n.input
        ? {
            interpret: e.type,
            value: e.name,
            alias: e.normalize(n[0], n),
          }
        : null
    })
    .filter((t) => {
      return t !== null
    })
}
