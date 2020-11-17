import {
	omega
} from './core.js'

const o = (type) => {
	return ((attrs, ...children) => {
		return omega(type, attrs, ...children)
	})
}

export const head = o("head")
export const meta = o("meta")
export const link = o("link")
export const title = o("title")
export const style = o("style")
export const script = o("script")