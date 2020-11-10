# Omega
A simple hyperscript framework for developing fast web applications

``` javascript
const spa = (() => {
	let currentPath = null
	let historyCacheSize = 5
	let historyCacheName = 'omega-history-cache'
	let afterNavigation = function() {}
	let page = document.getElementById('page')

	const extractTitle = html => {
		let title = (html.match(/<title>(.*?)<\/title>/gim) || []).map(v => v.substring(7, v.length - 8).trim())
		return title[0]
	}

	const extractPage = html => {
		let parser = new DOMParser()
		let doc = parser.parseFromString(html, 'text/html')

		return {
			page: doc.getElementById('page').innerHTML || '',
			id: doc.querySelector('div').id
		}
	}

	const hydrateLinks = () => {
		let links = document.querySelectorAll('a')
		for(let link of links) {
			let href = link.href
			if(!link.classList.contains('prevent-default')) {
				link.onclick = (e) => {
					e.preventDefault()

					restoreHistory(href).then(() => {
						pushUrlHistory(href)
						active()
					})
				}
			}
		}
	}

	const saveToHistoryCache = (url, scroll) => {
		let historyCache = JSON.parse(localStorage.getItem(historyCacheName)) || []
		
		for(let i = 0; i < historyCache.length; i++) {
			if(historyCache[i].url == url) {
				historyCache = historyCache.slice(i, 1)
				break
			}
		}
		
		historyCache.push({
			url, scroll
		})

		while(historyCache.length > historyCacheSize) {
			historyCache.shift()
		}
		
		localStorage.setItem(historyCacheName, JSON.stringify(historyCache))
	}

	const getHistoryCache = (url) => {
		const historyCache = JSON.parse(localStorage.getItem(historyCacheName)) || []
		
		for(let part of historyCache) {
			if(part.url == url) {
				return part
			}
		}
		
		return false
	}

	const saveHistory = () => {
		let path = currentPath || location.pathname + location.search
		history.replaceState({ url: path }, document.title, location.href)
		saveToHistoryCache(path, window.scrollY)
	}

	const pushUrlHistory = path => {
		history.pushState({ url: path }, '', path)
		currentPath = path
	}

	const loadHistoryFromServer = async path => {
		let html = await fetch(path).then(res => res.text()).catch(e => '')
		let newHTML = extractPage(html)
		
		page.innerHTML = newHTML.page
		document.querySelector('div').id = newHTML.id

		document.title = extractTitle(html)
		currentPath = path
	}

	const restoreHistory = async path => {
		saveHistory(currentPath)

		path = path || location.pathname + location.search
		let cached = getHistoryCache(path)

		let currentTime = Date.now()
		let revealer = await pageTransition()
		
		await loadHistoryFromServer(path)
		
		if(cached) {
			window.scrollTo(0, cached.scroll)
			currentPath = cached.url
		}
		
		let difference = Date.now() - currentTime
		if (difference <= 3000) {
			await sleep(3000 - difference)
		}

		hydrateLinks()
		endPageTransition(revealer)
	}

	const link = () => {
		hydrateLinks()
		window.addEventListener('popstate', async (e) => {
			const state = e.state
			if (state !== null) {
				await restoreHistory()
				active()
			}
		})
		window.addEventListener('load', active)
	}

	link()
})()
```