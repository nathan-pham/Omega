import { 
	force,
	render,
	Component
} from './core.js'

import {
	a,
	div
} from './html.js'

let router

class Router extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			current: location.pathname
		}

		this.init()

		router = this
	}
	restoreHistory(href) {
		this.saveHistory()

		this.setState({
			current: href
		})

	}
	saveHistory() {
		let url = this.state.current || location.pathname + location.search
		history.replaceState({ url }, document.title, location.href)
	}
	pushUrlHistory(url) {
		history.pushState({ url }, '', url)
	}
	init() {
		window.addEventListener('popstate', (e) => {
      const state = e.state
      if (state !== null) {
        this.restoreHistory()
      }
    })
	}
	navigate(href) {
		if(this.state.current !== href || this.state.current !== location.pathname) {
			this.pushUrlHistory(href)
			this.restoreHistory(href)
		}
	}
	render() {
		return (
			this.props[this.state.current]
		)
	}
}

class Link extends Component {
	constructor(props, ...children) {
		super(props)

		this.text = children.shift()
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(e) {
		e.preventDefault()
		
		if(!router) {
			throw new Error('[Link] you must declare a router before using link components.')
		}

		router.navigate(e.target.pathname)
	}
	render() {
		return (
			a({ 
				href: this.props.href,
				onClick: this.handleClick
			}, this.text)	
		)
	}
}

/*

app.get('/test', () => {
	return (
		h1({}, 'test')
	)
})

*/

export {
	Router,
	Link
}