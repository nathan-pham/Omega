import { 
	render,
	Component
} from '/src/core.js'

import {
	Link,
	Router
} from '/src/router.js'

import { 
	li,
	h1, 
	h2,
	div,
	button
} from '/src/html.js'

class People extends Component {
	constructor(props) {
		super(props)

		this.state = {
			list: [
				'n', 'a', 't', 'h', 'a', 'n'
			]
		}

	}
	render(props, state) {
		return (
			h2({}, 
				...this.state.list.map(item => li({}, item))
			)
		)
	}
}

const header = (props) => {
	return (
		h1({}, props.title)
	)
}

class Button extends Component {
	constructor(props) {
		super(props)

		this.state = {
			counter: 0
		}

		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(e) {
		this.setState((state) => {
			return {
				counter: state.counter + 1
			}
		})
	}
	render() {
		return (
			button({
				onClick: this.handleClick
			}, `Counter: ${this.state.counter}`)
		)
	}
}

const Home = () => {
	return (
		div({}, 
			header({ title: 'Virtual DOM App' }),
			new Button(),
			new People(),
			new Link({
				href: '/test'
			}, 'test')
		)
	)
}

const Test = () => {
	return (
		div({},
			header({ title: 'Test' }),
			new Link({
				href: '/'
			}, 'home')
		)
	)
}

const router = new Router(document.getElementById('root'))

router.get('/', () => {
	return Home()
})

router.get('/test', () => {
	return Test()
})

router.start()