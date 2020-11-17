import {
	update
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
	update(node.render())
}

// setInterval(() => {
// 	count ++
// 	let newApp = counter(count)
// 	const patch = diffTree(App, newApp)

// 	root = patch(root)
// 	vApp = newApp
// }, 1000)


// const renderComponent = (component) => {
// 	let rendered = component.render(component.props, component.state)
// 	component.base = diff(component.base, rendered)	
// }

// const renderComponent = (node) => {
// 	let app = renderHandler(node)

// 	let patch = diffTree(document.body, app)

// 	node.base = patch(app)
// }

export {
	Component
}