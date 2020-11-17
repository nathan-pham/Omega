import {
	html,
	render,
	Component
} from '/index.js'

const {
	div, button, h1, p, input
} = html

class Index extends Component {
	constructor(...props) {
		super(...props)
		this.state = {
			counter: 0
		}
		this.test = this.test.bind(this)
	}
	test() {
		this.setState(state => ({ counter: state.counter + 1 }))
	}
	render() {
		return (
			div({}, 
				h1({}, 'The Virtual DOM'),
				p({}, 'This is an example app.'),
				input({ placeholder: 'example' }),
				button({ onClick: this.test }, `Counter: ${this.state.counter}`),
				this.props.children
			)
		)
	}
}

render(new Index({}, 'test'), document.getElementById('root'))