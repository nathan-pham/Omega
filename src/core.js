const omega = (tag, attributes, ...children) => {
	return { tag, attributes, children: children.flat() }
}

const renderNode = (v) => {
	let el

	const { tag, attributes, children } = v
	
	if(typeof v == 'string' || v instanceof String) {
		return document.createTextNode(v)
	}
	else if(!Object.keys(v).length) {
		return
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
		el = renderNode(v)
	}

	(children || []).forEach((child) => {
		let c = renderNode(child)
		if(c) {
			el.appendChild(c)
		}
	})

	return el
}

const renderComponent = (component, parent) => {
	let rendered = component.render(component.props, component.state)
	component.base = diff(component.base, rendered)	
}

class Component {
	constructor(props) {
		this.props = props
		this.state = {}
	}
	setState(state) {
		this.state = Object.assign({},
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
	if(dom) {
		if((v.children || []).length !== dom.childNodes.length) {
			let c = renderNode(v.children[v.children.length - 1])
			if(c) {
				dom.appendChild(c)
			}
		}
		else if(typeof v == 'string' || v instanceof String) {
			dom.nodeValue = v
		}

		dom.childNodes.forEach((child, i) => {
			diff(child, v.children[i])
		})
		
		return dom
	}
	else {
		let c = renderNode(v)
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