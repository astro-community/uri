import * as url from 'spec-url'

interface InternalURL {
	scheme?: string
	user?: string
	pass?: string
	host?: string | number | number[] | string[]
	port?: string
	drive?: string
	root?: string
	dirs?: string[]
	file?: string
	query?: string
	hash?: string
}

const mapOfInternalURLs: WeakMap<URL, InternalURL> = new WeakMap

const getInternalURL = (instance: URL) => mapOfInternalURLs.get(instance) || mapOfInternalURLs.set(instance, {}).get(instance) as InternalURL

// @ts-ignore
const toInternalURL = (...hrefs: URISource[]): InternalURL => hrefs.reduce(
	(internalURL, nextHREF) => url.rebase(
		url.parse(
			String(nextHREF)
		),
		internalURL
	),
	url.parse(
		String(
			hrefs.shift()
		)
	)
)

const toHost = (url: number | string | number[] | string[] | void) => (
	url == null ? '' : typeof url == 'object' ? url.join('') : String(url)
)

class URI extends URL {
	constructor(href: URISource, ...hrefs: URISource[]) {
		super('noop://')

		const internalURL = toInternalURL(...[ href ].concat(hrefs).reverse())

		super.hash = internalURL.hash || ''
		super.hostname = toHost(internalURL.host)
		super.search = internalURL.query || ''

		mapOfInternalURLs.set(this, internalURL)
	}

	toJSON(): string {
		return this.href
	}

	toString(): string {
		return this.href
	}

	get host(): string {
		const internalURL = getInternalURL(this)

		return String().concat(
			toHost(internalURL.host),
			internalURL.port != null ? ':' + internalURL.port : ''
		)
	}

	get href(): string {
		const internalURL = getInternalURL(this)

		return String().concat(
			internalURL.scheme ? internalURL.scheme + ':' : '',
			internalURL.user ? '//' + internalURL.user : '',
			internalURL.pass ? ':' + internalURL.pass : '',
			toHost(internalURL.host) ? internalURL.user ? '@' : '//' : '',
			toHost(internalURL.host),
			internalURL.port != null ? ':' + internalURL.port : '',
			internalURL.drive ? '/' + internalURL.drive : '',
			internalURL.root ?? '',
			internalURL.dirs ? internalURL.dirs.join('/') + '/' : '',
			internalURL.file ?? '',
			this.search,
			this.hash
		)
	}

	set href(href: URISource) {
		const internalURL = toInternalURL(href)

		super.hash = internalURL.hash || ''
		super.hostname = toHost(internalURL.host)
		super.password = internalURL.pass || ''
		super.search = internalURL.query || ''
		super.username = internalURL.user || ''

		mapOfInternalURLs.set(this, internalURL)
	}

	get hostname(): string {
		return toHost(getInternalURL(this).host)
	}

	set hostname(hostname: string) {
		const oldHostname = super.hostname

		super.hostname = hostname

		const newHostname = super.hostname

		if (oldHostname !== newHostname) getInternalURL(this).host = newHostname
	}

	get origin(): string {
		const internalURL = getInternalURL(this)

		return internalURL.scheme === 'blob' ? String().concat(
			internalURL.root ?? '',
			internalURL.dirs ? internalURL.dirs.slice(0, 3).join('/') : ''
		) : internalURL.host ? String().concat(
			internalURL.scheme ? internalURL.scheme + ':' : '',
			internalURL.host ? '//' + internalURL.host : '',
			internalURL.port != null ? ':' + internalURL.port : ''
		) : ''
	}

	get password(): string {
		return getInternalURL(this).pass ?? ''
	}

	get pathname(): string {
		const internalURL = getInternalURL(this)

		return String().concat(
			internalURL.drive ? '/' + internalURL.drive : '',
			internalURL.root ?? '',
			internalURL.dirs ? internalURL.dirs.join('/') + '/' : '',
			internalURL.file ?? ''
		)
	}

	get port(): string {
		return String(getInternalURL(this).port ?? '')
	}

	get protocol(): string {
		const internalURL = getInternalURL(this)

		return internalURL.scheme ? internalURL.scheme + ':' : ''
	}

	get scheme(): string {
		return getInternalURL(this).scheme ?? ''
	}

	get search(): string {
		return super.search
	}

	set search(search) {
		super.search = search

		getInternalURL(this).query = super.search.slice(1)
	}

	get username(): string {
		return getInternalURL(this).user ?? ''
	}

	get segments(): string[] {
		const internalURL = getInternalURL(this)

		return [
			...(internalURL.drive ? [ internalURL.drive ] : []),
			...(internalURL.dirs ?? []),
			...(internalURL.file ? [ internalURL.file ] : internalURL.dirs ? [''] : []),
		]
	}

	to(href: string[], ...hrefs: string[]) {
		const TypeOfThis = this.constructor as typeof URI

		return new TypeOfThis(...hrefs.reverse().concat(href, this.href) as [ URISource, ...URISource[] ])
	}

	static from(href: URISource, ...hrefs: URISource[]) {
		const TypeOfThis = this

		return new TypeOfThis(...hrefs.reverse().concat(href) as [ URISource, ...URISource[] ])
	}
}

export type URISource = URL | string

export {
	URI as default,
	URI as URI
}
