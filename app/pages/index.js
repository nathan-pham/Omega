import {
	input, aside, select, option, textarea, button, span, div, p
} from '/omega/html.js'

import {
	Component
} from '/omega/core.js'

class Modal extends Component {
	constructor(...props) {
		super(...props)

		this.state = {
			show: this.props.show
		}

		this.test = this.test.bind(this)
	}
	test() {
		this.setState({
			show: false
		})
	}
	render() {
		return (
			aside({ style: `display: ${this.state.show ? 'block' : 'none' }` },
				span({ class: 'x' }),
				div({},
					select({ name: 'type', id: 'type' },
						option({ value: 'book' }, 'Book'),
						option({ value: 'game' }, 'Game'),
						option({ value: 'music' }, 'Music')
					),
					input({ placeholder: 'Pick a project (type to search)' }),
					input({ placeholder: 'Add title' }),
					textarea({ placeholder: 'Type something...' })
				),
				div({ class: 'flex' },
					button({ onClick: this.test }, 'Cancel'),
					button({}, `${this.state.show ? 'block' : 'none' }`)
				),
			)	
		)
	}
}

class Forum extends Component {
	constructor(...props) {
		super(...props)

		this.state = {
			show: true
		}

		this.handleModal = this.handleModal.bind(this)
	}
	handleModal() {
		this.setState(state => ({ show: !state.show }))
	}
	render() {
		return (
			div({ id: 'Forum', pathname: this.props.pathname },
				p({ class: 'text' }, 'Explore a variety of new games, books, and music by the community.'),
				div({ class: 'flex align-center' },
					input({ class: 'default', style: 'margin: 0 1rem 0 0', placeholder: 'Search for Post' }),
					button({ class: 'button-primary', style: 'white-space: nowrap', onClick: this.handleModal }, 'Add Post')
				),
				new Modal({ show: this.state.show })
			)
		)
	}
}

export default Forum
