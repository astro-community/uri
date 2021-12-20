import { assert, test } from './_setup.js'
import { RelativeURL } from '../mod.js'

test(() => {
	// ...

	return [
		{
			name: 'RelativeURL Class',
			test() {
				assert.equal(typeof RelativeURL, 'function')
				assert.equal(RelativeURL.prototype instanceof URL, true)
			},
		},
		{
			name: 'Constructs a URL',
			test() {
				const url = new RelativeURL('../assets/kitten.jpg')
	
				assert.equal(url.href, '../assets/kitten.jpg')
				assert.equal(url.toString(), '../assets/kitten.jpg')
				assert.equal(String(url), '../assets/kitten.jpg')
				assert.equal(`${url}`, '../assets/kitten.jpg')
			},
		},
		{
			name: 'Resolves a nested URL',
			test() {
				const rel = new RelativeURL('../assets/kitten.jpg')
				const url = new URL(rel, 'https://localhost/kittens/index.html')
	
				assert.equal(url.href, 'https://localhost/assets/kitten.jpg')
				assert.equal(url.toString(), 'https://localhost/assets/kitten.jpg')
				assert.equal(String(url), 'https://localhost/assets/kitten.jpg')
				assert.equal(`${url}`, 'https://localhost/assets/kitten.jpg')
			},
		},
		{
			name: 'Fully supports URL with a relative URL',
			test() {
				const url = new RelativeURL('../assets/kitten.jpg')

				assert.equal(url.hash, '')
				assert.equal(url.host, '')
				assert.equal(url.hostname, '')
				assert.equal(url.href, '../assets/kitten.jpg')
				assert.equal(url.origin, '')
				assert.equal(url.password, '')
				assert.equal(url.pathname, '../assets/kitten.jpg')
				assert.equal(url.port, '')
				assert.equal(url.protocol, '')
				assert.equal(url.search, '')
				assert.equal(url.searchParams.toString(), '')
				assert.equal(url.username, '')

				assert.deepEqual(url.segments, [ '..', 'assets', 'kitten.jpg' ])
			},
		},
		{
			name: 'Fully supports URL with an absolute URL',
			test() {
				const url = new RelativeURL('https://un:pw@localhost:8080/path/to/assets/kitten.jpg?q=a#root')

				assert.equal(url.hash, '#root')
				assert.equal(url.host, 'localhost:8080')
				assert.equal(url.hostname, 'localhost')
				assert.equal(url.href, 'https://un:pw@localhost:8080/path/to/assets/kitten.jpg?q=a#root')
				assert.equal(url.origin, 'https://localhost:8080')
				assert.equal(url.password, 'pw')
				assert.equal(url.pathname, '/path/to/assets/kitten.jpg')
				assert.equal(url.port, '8080')
				assert.equal(url.protocol, 'https:')
				assert.equal(url.search, '?q=a')
				assert.equal(url.searchParams.toString(), 'q=a')
				assert.equal(url.username, 'un')

				assert.deepEqual(url.segments, [ 'path', 'to', 'assets', 'kitten.jpg' ])
			},
		},
		{
			name: 'Supports methods',
			test() {
				const url = new RelativeURL('https://localhost/path/to/assets/kitten.jpg?q=a#root')

				assert.equal(url.toJSON(), 'https://localhost/path/to/assets/kitten.jpg?q=a#root')

				assert.equal(url.toString(), 'https://localhost/path/to/assets/kitten.jpg?q=a#root')

				assert.equal(url.to('puppy.jpg').toString(), 'https://localhost/path/to/assets/puppy.jpg')

				assert.equal(
					new RelativeURL('../assets/kitten.jpg?q=a#root').to('puppy.jpg').toString(),
					'../assets/puppy.jpg'
				)
			},
		},
	]
})
