declare module 'spec-url' {
	export function resolve(url: string | URL, rel: string | URL): SpecURL

	export function parse(url: string | URL): SpecURL

	export function normalise(url: string | URL): SpecURL

	export function goto(url1: string | URL, url2: string | URL): SpecURL

	export function rebase(url1: string | URL, url2: string | URL): SpecURL

	class SpecURL extends URL {
		resolve(url: string | URL): SpecURL
	}
}