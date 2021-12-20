# RelativeURL

**RelativeURL** creates [fully compatible](https://developer.mozilla.org/en-US/docs/Web/API/URL) `URL` interfaces, without requiring a base URL. <sup>[1](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL#parameters)</sup> <sup>[2](https://github.com/whatwg/url/issues/531)</sup> <sup>[3](https://alwinb.github.io/url-specification/#url-specification)</sup>

```shell
npm install relative-url-interface
```

```js
const kitten_image = new RelativeURL('../assets/kitten.jpg')

String(kitten_image) // "../assets/kitten.jpg"
```

The `RelativeURL` interface extends `URL` and can be used as a drop-in replacement. It is powered by [`spec-url`](https://www.npmjs.com/package/spec-url) and is ideal for server-side code, pre-compiled code, or any situation where an absolute URL may not be known.

```js
const puppy_page = new RelativeURL('file://path/to/site/src/pages/puppy.astro')

const absolute_kitten = new RelativeURL(kitten_image, puppy_page)

fs.readFile(absolute_kitten, 'utf8') // reads "file://path/to/site/src/assets/kitten.jpg"
```



## Features

#### hash

The `hash` property is a string representing the <strong>fragment identifier</strong> of the URL. When present, it is preceeded by a number sign (<code>#</code>).

#### host

The `host` property is a string representing the <strong>domain</strong> and <strong>port</strong> of the URL. When present, the <strong>port</strong> is preceeded by a colon (<code>:</code>).

#### hostname

The `hostname` property is a string representing the <strong>domain</strong> of the URL.

#### href

The `href` property is a string representing the whole <strong>URL</strong>, including any search parameters and fragment identifiers.

#### origin

The `origin` property is a string representing the <strong>scheme</strong>, <strong>domain</strong>, and <strong>port</strong> of the URL. When present, the <strong>port</strong> is preceeded by a colon (<code>:</code>).

#### password

The `password` property is a string representing the <strong>password</strong> of the URL.

#### pathname

The `pathname` property is a string representing the <strong>path</strong> of the URL, which does not include the <strong>origin</strong>, <strong>search parameters</strong>, or <strong>fragment identifiers</strong>.

#### port

The `port` property is a string representing the <strong>port</strong> of the URL.

#### protocol

The `protocol` property is a string representing the <strong>scheme</strong> of the URL, including the colon (<code>:</code>) that proceeds it.

#### search

The `search` property is a string representing the <strong>search parameters</strong> of the URL. When present, it is preceeded by a question mark (<code>?</code>).

#### searchParams

The `searchParams` property is a <code>URLSearchParams</code> object representing the parsed <strong>search parameters</strong> of the URL.

#### username

The `username` property is a string representing the <strong>username</strong> of the URL.

#### segments

The `segments` property is an array of strings representing the <strong>path segments</strong> of the URL.</dd>



## Methods

#### toString

The `toString` method returns the whole URL as a string. It is a synonym for the `href` getter property.

```js
new RelativeURL('../assets/kitten.jpg').toString() // "../assets/kitten.jpg"
```

#### toJSON

The `toJSON` method returns the whole URL as a string. It is a synonym for the `href` getter property.

```js
new RelativeURL('../assets/kitten.jpg').toJSON() // "../assets/kitten.jpg"
```

#### to

The `to` method returns a new URL resolved by the current URL.

```js
const kitten = new RelativeURL('../assets/kitten.jpg')

String(kitten.to('puppy.jpg')) // "../assets/puppy.jpg"
```

---



## License

Code original to this project is licensed under the CC0-1.0 License.

Code from [spec-url](https://www.npmjs.com/package/spec-url) is licensed under the The MIT License (MIT), Copyright Alwin Blok.
