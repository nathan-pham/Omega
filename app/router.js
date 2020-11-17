import {
	html,
	render,
	Component
} from '/index.js'

const {
	div, button, h1, p, input
} = html

class Button extends Component {
	constructor(...props) {
		super(...props) 

		this.state = {
			counter: 0
		}

		this.click = this.click.bind(this)
	}
	click() {
		this.setState(state => ({ counter: state.counter + 1 }))
	}
	render() {
		return (
			button({ onClick: this.click }, `Counter: ${this.state.counter}`)
		)
	}
}

class Index extends Component {
	constructor(...props) {
		super(...props)
	}
	render() {
		return (
			div({}, 
				h1({}, 'The Virtual DOM'),
				p({}, 'This is an example app.'),
				new Button()
			)
		)
	}
}

render(new Index({}, 'test'), document.getElementById('root'))