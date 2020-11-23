const omega = (tag, attrs, ...children) => {
	return {
		tag,
		attrs,
		children: children.flat() || []
	}
}

const renderNode = (node) => {
	let component = typeof node.render == 'function'

	let vNode = node
	if(component) {
		vNode = node.render()
		node.vNode = vNode
	}

	const { tag, attrs, children } = vNode

	let el = document.createElement(tag)

	for(const [key, value] of Object.entries(attrs)) {
		key.startsWith('on')
			? el.addEventListener(key.substring(2).toLowerCase(), value)
			: el.setAttribute(key, value)
	}

	for(const child of children) {
		el.appendChild(renderHandler(child))
	}

	if(component) {
		node.vBase = el
	}

	return el
}

const renderHandler = (node) => {
	return (
		typeof node === 'string'
			? document.createTextNode(node)
			: renderNode(node)
	)
}

const mount = (node, target) => {
	target.replaceWith(node)
	return node
}

const render = (node, target) => {
	mount(renderHandler(node), target)
}

export {
	omega,
	render,
	renderHandler
}