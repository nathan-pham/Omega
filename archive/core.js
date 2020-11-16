const omega = (tag, attributes, ...children) => {
	return { tag, attributes, children: children.flat() }
}

const renderNode = (v) => {
	let el

	const { tag, attributes, children } = v

	if(typeof v == 'string' || v instanceof String) {
		return document.createTextNode(v)
	}
	else if(typeof tag == 'string') {
		el = document.createElement(tag)

		for(let key in attributes) {
			key.startsWith('on')
				? el.addEventListener(key.substring(2).toLowerCase(), attributes[key])
				: el.setAttribute(key, attributes[key])
		}
	}
	else if(typeof v.render == 'function') {
		el = renderNode(v.render(v.props, v.state))
		v.base = el
	}
	else {
		console.log(v)
	}

	(children || []).forEach((child) => {
		let c = renderNode(child)
		if(c) {
			el.appendChild(c)
		}
	})

	return el
}

const renderComponent = (component) => {
	let rendered = component.render(component.props, component.state)
	component.base = diff(component.base, rendered)	
}

class Component {
	constructor(...props) {
		let attrs = props.shift() || {}

		this.props = Object.assign(attrs, { children: (props.flat().filter(v => v) || []) })

		this.state = {}
	}
	setState(state) {
		this.state = Object.assign({}, this.state,
			typeof state == 'function'
				? state(this.state, this.props)
				: state
		)
		
		renderComponent(this)
	}
}

let cache = []

const force = {
	render: () => {
		const [app, root] = cache
		diff(null, app, root)
	},
	clear: () => {
		const [app, root] = cache

		while(root.firstChild) {
			root.removeChild(root.firstChild)
		}
	}
}

const render = (app, root) => {
	cache = [app, root]

	diff(null, app, root)
}

const diff = (dom, v, parent) => {
	let el = v

	if(!v) return

	let component = typeof v.render == 'function'
	if(component) {
		el = v.render(v.props, v.state)
		v.base = diff(dom, el)
		console.log(v.base)
		// diff(component.base, rendered)	
	}

	if(dom) {
		if((el.children || []).length !== dom.childNodes.length) {
			let c = renderNode(el.children[el.children.length - 1])
			if(c) {
				dom.appendChild(c)
			}
		}
		
		if((typeof el == 'string' || el instanceof String) && dom.nodeValue !== el) {
			dom.nodeValue = el
		}
		else {
			let vAttributes = el.attributes
			for(const key in vAttributes) {
				if(vAttributes[key] !== dom.getAttribute(key) && dom.hasAttribute(key)) {
					dom.setAttribute(key, vAttributes[key])
				}
			}

			/*
			dom.childNodes.forEach((child, i) => {
				let vNode = el.children[i].attributes
				let rNode = dom.childNodes[i]
				
				for(const key in vNode) {
					if(vNode[key] !== rNode.getAttribute(key) && rNode.hasAttribute(key)) {
						rNode.setAttribute(key, vNode[key])
					}
				}
			})
			*/
		}

		dom.childNodes.forEach((child, i) => {
			diff(child, el.children[i])
		})

		return dom
	}
	else if(parent) {
		let c = renderNode(el)
		if(c) {
			parent.appendChild(c)
		}
		return c
	}
}

export {
	omega,
	force,
	render,
	Component
}