import {
	diffTree
} from './difference.js'

const omega = (tag, attrs, ...children) => {
	return {
		tag,
		attrs,
		children: children.flat() || []
	}
}

const renderNode = (node) => {
	node = typeof node.render == 'function'
		? node.render()
		: node

	const { tag, attrs, children } = node

	let el = document.createElement(tag)

	for(const [key, value] of Object.entries(attrs)) {
		key.startsWith('on')
			? el.addEventListener(key.substring(2).toLowerCase(), value)
			: el.setAttribute(key, value)
	}

	for(const child of children) {
		el.appendChild(renderHandler(child))
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

let vApp, root

const render = (node, target) => {
	vApp = renderHandler(node)
	root = mount(vApp, target)
}

const update = (nApp) => {
	root = diffTree(vApp, nApp)(root)
	// const patch = diffTree(vApp, nApp)
	// root = patch(root)
	vApp = renderHandler(nApp)
}


// let App = render(logo())

// let root = mount(App, document.getElementById('root'))

// let count = 0
// const vApp = render(counter(count))
// let root = mount(vApp, document.getElementById('root'))

// setInterval(() => {
// 	count ++
// 	let newApp = counter(count)
// 	const patch = diffTree(App, newApp)

// 	root = patch(root)
// 	vApp = newApp
// }, 1000)

export {
	omega,
	render,
	update,
	renderHandler
}