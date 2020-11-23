import {
	render,
	Component
} from '/index.js'

import {
	div, button, h1, p, input
} from '/omega/html.js'

class Modal extends Component {
	constructor(...props) {
		super(...props)

		this.state = {
			show: this.props.show
		}
	}
	render() {
		return (
			div({ style: `display: ${this.state.show ? 'block': 'none'}` },
				h1({}, 'Modal')
			)
		)
	}
}

class Index extends Component {
	constructor(...props) {
		super(...props)
		this.state = {
			show: false
		}
		this.modal = this.modal.bind(this)
	}
	modal() {
		this.setState(state => ({ show: !state.show }))
	}
	render() {
		return (
			div({}, 
				h1({}, 'The Virtual DOM'),
				p({}, 'This is an example app.'),
				button({ onClick: this.modal }, 'modal'),
				new Modal({ show: this.state.show })
			)
		)
	}
}

render(new Index({}, 'test'), document.getElementById('root'))