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

class Router {
	routes = {}
	current = location.pathname
	cache = 'omega-router'

	constructor(root) {
		this.root = root
		this.init()

		router = this
	}
	get(path, render) {
		this.routes[path] = render
	}
	remove(path) {
		delete this.routes[path]
	}
	init() {
		window.addEventListener('popstate', (e) => {
			const state = e.state
      if (state !== null) {
        this.restoreHistory()
      }
    })
	}
	restoreHistory(path) {
		this.saveHistory()

		path = path || location.pathname + location.search
		// let cached = getHistoryCache(path)
		// if(cached) { window.scrollTo(0, cached.scroll) }

		force.clear()
		render(this.routes[path](), this.root)	

		this.current = path	
	}
	pushUrlHistory(url) {
		history.pushState({ url }, '', url)
	}
	saveHistory() {
		let url = this.current || location.pathname + location.search
		history.replaceState({ url }, document.title, location.href)
	}
	navigate(path) {
		if(this.current !== path) {
			this.restoreHistory(path)
			this.pushUrlHistory(path)
		}
	}
	start() {
		render(this.routes[this.current](), this.root)
	}
}

class Link extends Component {
	constructor(props, ...children) {
		super(props)

		this.text = children.shift()
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick(e) {
		if(e.ctrlKey || e.metaKey || e.shiftKey) {
			return
		}

		e.preventDefault()
		
		if(!router) {
			throw new Error('You must declare an router before you can use link components.')
		}

		router.navigate(e.target.pathname)

		return false
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

export {
	Link, 
	Router
}