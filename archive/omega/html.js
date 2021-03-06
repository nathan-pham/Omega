import { 
	omega 
} from './core.js'

const o = (type) => {
	return ((attrs, ...children) => {
		return omega(type, attrs, ...children)
	})
}

export const a = o("a")
export const b = o("b")
export const i = o("i")
export const p = o("p")
export const q = o("q")
export const s = o("s")
export const br = o("br")
export const dd = o("dd")
export const dl = o("dl")
export const dt = o("dt")
export const em = o("em")
export const h1 = o("h1")
export const h2 = o("h2")
export const h3 = o("h3")
export const h4 = o("h4")
export const h5 = o("h5")
export const h6 = o("h6")
export const hr = o("hr")
export const li = o("li")
export const ol = o("ol")
export const rp = o("rp")
export const rt = o("rt")
export const td = o("td")
export const th = o("th")
export const tr = o("tr")
export const ul = o("ul")
export const bdi = o("bdi")
export const bdo = o("bdo")
export const col = o("col")
export const del = o("del")
export const dfn = o("dfn")
export const div = o("div")
export const img = o("img")
export const ins = o("ins")
export const kbd = o("kbd")
export const map = o("map")
export const nav = o("nav")
export const pre = o("pre")
export const rtc = o("rtc")
export const sub = o("sub")
export const sup = o("sup")
export const svg = o("svg")
export const wbr = o("wbr")
export const abbr = o("abbr")
export const area = o("area")
export const cite = o("cite")
export const code = o("code")
export const data = o("data")
export const form = o("form")
export const main = o("main")
export const mark = o("mark")
export const ruby = o("ruby")
export const samp = o("samp")
export const span = o("span")
export const time = o("time")
export const aside = o("aside")
export const audio = o("audio")
export const input = o("input")
export const label = o("label")
export const meter = o("meter")
export const param = o("param")
export const small = o("small")
export const table = o("table")
export const tbody = o("tbody")
export const tfoot = o("tfoot")
export const thead = o("thead")
export const track = o("track")
export const video = o("video")
export const button = o("button")
export const canvas = o("canvas")
export const dialog = o("dialog")
export const figure = o("figure")
export const footer = o("footer")
export const header = o("header")
export const iframe = o("iframe")
export const legend = o("legend")
export const object = o("object")
export const option = o("option")
export const output = o("output")
export const select = o("select")
export const source = o("source")
export const strong = o("strong")
export const address = o("address")
export const article = o("article")
export const caption = o("caption")
export const details = o("details")
export const section = o("section")
export const summary = o("summary")
export const picture = o("picture")
export const colgroup = o("colgroup")
export const datalist = o("datalist")
export const fieldset = o("fieldset")
export const menuitem = o("menuitem")
export const optgroup = o("optgroup")
export const progress = o("progress")
export const textarea = o("textarea")
export const blockquote = o("blockquote")
export const figcaption = o("figcaption")