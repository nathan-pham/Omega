import {
	renderHandler
} from './core.js'

import {
	diffTree
} from './difference.js'

class Component {
	constructor(...props) {
		let attrs = props.shift() || {}

		this.props = Object.assign(attrs, { 
			children: (props.flat().filter(v => v) || [])
		})

		this.vNode = null
		this.vBase = null
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

const renderComponent = (node) => {
	let nApp = node.render()
	node.vBase = diffTree(node.vBase, nApp)(node.vBase)
	node.vNode = nApp
}

// let vApp, root

// const render = (node, target) => {
// 	vApp = renderHandler(node)
// 	root = mount(vApp, target)
// }

// const update = (nApp) => {
// 	root = diffTree(vApp, nApp)(root)
// 	vApp = renderHandler(nApp)
// }


export {
	Component
}