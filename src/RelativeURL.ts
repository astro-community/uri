import * as url from 'spec-url'

interface InternalURL {
	scheme?: string
	user?: string
	pass?: string
	host?: string
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

const toInternalURL = (...hrefs: (URL | string)[]): InternalURL => url.normalise(
	hrefs.reduce(
		(internalURL, nextHREF) => url.goto(
			internalURL,
			url.parse(
				String(nextHREF)
			)
		),
		url.parse(
			String(
				hrefs.shift()
			)
		)
	)
)

export class RelativeURL extends URL {
	constructor(href: URL | string, ...hrefs: (URL | string)[]) {
		super('noop://')

		const internalURL = toInternalURL(...[ href ].concat(hrefs).reverse())

		super.hash = internalURL.hash || ''
		super.hostname = internalURL.host || ''
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
			internalURL.host ?? '',
			internalURL.port != null ? ':' + internalURL.port : ''
		)
	}

	get href(): string {
		const internalURL = getInternalURL(this)

		return String().concat(
			internalURL.scheme ? internalURL.scheme + ':' : '',
			internalURL.user ? '//' + internalURL.user : '',
			internalURL.pass ? ':' + internalURL.pass : '',
			internalURL.host ? internalURL.user ? '@' : '//' : '',
			internalURL.host ?? '',
			internalURL.port != null ? ':' + internalURL.port : '',
			internalURL.drive ? '/' + internalURL.drive : '',
			internalURL.root ?? '',
			internalURL.dirs ? internalURL.dirs.join('/') + '/' : '',
			internalURL.file ?? '',
			this.search,
			this.hash
		)
	}

	set href(href: URL | string) {
		const internalURL = toInternalURL(href)

		super.hash = internalURL.hash || ''
		super.hostname = internalURL.host || ''
		super.password = internalURL.pass || ''
		super.search = internalURL.query || ''
		super.username = internalURL.user || ''

		mapOfInternalURLs.set(this, internalURL)
	}

	get hostname(): string {
		return getInternalURL(this).host ?? ''
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

	to(...hrefs: string[]) {
		const TypeOfThis = this.constructor as typeof RelativeURL

		hrefs = hrefs.reverse().concat(this.href)

		return new TypeOfThis(hrefs.shift() as string, ...hrefs)
	}
}
