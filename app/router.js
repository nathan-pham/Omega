import {
	Link,
	Router
} from '/omega/router.js'

import Index from './pages/index.js'

const router = new Router(document.getElementById('root'))

router.get('/', (props) => new Index(props))


router.start()