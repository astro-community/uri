# URI

**URI** is a [**URL** interface](https://developer.mozilla.org/en-US/docs/Web/API/URL) that does not require a base URL. <sup>[1](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL#parameters)</sup> <sup>[2](https://github.com/whatwg/url/issues/531)</sup> <sup>[3](https://alwinb.github.io/url-specification/#url-specification)</sup>

```shell
npm install relative-url-interface
```

```js
import URI from 'relative-url-interface'

const uri = new URI('../assets/kitten.jpg')

String(uri) // "../assets/kitten.jpg"
```

The `URI` class extends `URL` and can be used as a drop-in replacement. It is powered by [`spec-url`](https://www.npmjs.com/package/spec-url), and it is ideal for server-side code, pre-compiled code, or any situation where absolute URLs may not be known.

```js
import URI from 'relative-url-interface'

const puppy_page = new URI('file://path/to/site/src/pages/puppy.astro')
const kitty_image = URI.from('../assets/kitten.jpg')

const absolute_kitten = new URI(kitty_image, puppy_page)

fs.readFile(absolute_kitten, 'utf8') // contents of "file://path/to/site/src/assets/kitten.jpg"
```



## Properties

#### segments

The `segments` property is an array of strings representing the <strong>path segments</strong> of the URL.</dd>

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.segments // [ "path", "to", "asset.jpg" ]
```

```js
const uri = new URI('../to/asset.jpg')

uri.segments // [ "..", "to", "asset.jpg" ]
```

#### href

The `href` property is a string representing the whole <strong>URL</strong>, including any search parameters and fragment identifiers.

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.href // "https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content"
```

```js
const uri = new URI('../to/asset.jpg')

uri.href // "../to/asset.jpg"
```

#### protocol

The `protocol` property is a string representing the <strong>scheme</strong> of the URL, including the colon (<code>:</code>) that proceeds it.

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.protocol // "https:"
```

```js
const uri = new URI('../to/asset.jpg')

uri.protocol // ""
```

#### origin

The `origin` property is a string representing the <strong>scheme</strong>, <strong>domain</strong>, and <strong>port</strong> of the URL. When present, the <strong>port</strong> is preceeded by a colon (<code>:</code>).

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.origin // "https://localhost:8080"
```

```js
const uri = new URI('../to/asset.jpg')

uri.origin // ""
```

#### host

The `host` property is a string representing the <strong>domain</strong> and <strong>port</strong> of the URL. When present, the <strong>port</strong> is preceeded by a colon (<code>:</code>).

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.host // "localhost:8080"
```

```js
const uri = new URI('../to/asset.jpg')

uri.host // ""
```

#### hostname

The `hostname` property is a string representing the <strong>domain</strong> of the URL.

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.hostname // "localhost"
```

```js
const uri = new URI('../to/asset.jpg')

uri.hostname // ""
```

#### username

The `username` property is a string representing the <strong>username</strong> of the URL.

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.username // "un"
```

```js
const uri = new URI('../to/asset.jpg')

uri.username // ""
```

#### password

The `password` property is a string representing the <strong>password</strong> of the URL.

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.password // "pw"
```

```js
const uri = new URI('../to/asset.jpg')

uri.password // ""
```

#### port

The `port` property is a string representing the <strong>port</strong> of the URL.

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.port // "8080"
```

```js
const uri = new URI('../to/asset.jpg')

uri.port // ""
```

#### pathname

The `pathname` property is a string representing the <strong>path</strong> of the URL, which does not include the <strong>origin</strong>, <strong>search parameters</strong>, or <strong>fragment identifiers</strong>.

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.pathname // "/path/to/asset.jpg"
```

```js
const uri = new URI('../to/asset.jpg')

uri.pathname // "../to/asset.jpg"
```

#### search

The `search` property is a string representing the <strong>search parameters</strong> of the URL. When present, it is preceeded by a question mark (<code>?</code>).

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.search // "?q=a"
```

```js
const uri = new URI('../to/asset.jpg')

uri.search // ""
```

#### searchParams

The `searchParams` property is a <code>URLSearchParams</code> object representing the parsed <strong>search parameters</strong> of the URL.

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.searchParams // URLSearchParams { 'q' => 'a' }
```

```js
const uri = new URI('../to/asset.jpg')

uri.searchParams // URLSearchParams {}
```

#### hash

The `hash` property is a string representing the <strong>fragment identifier</strong> of the URL. When present, it is preceeded by a number sign (<code>#</code>).

```js
const uri = new URI('https://un:pw@localhost:8080/path/to/asset.jpg?q=a#content')

uri.hash // "#content"
```

```js
const uri = new URI('../to/asset.jpg')

uri.hash // ""
```



## Methods

#### toString

The `toString` method returns the whole URL as a string. It is a synonym for the `href` getter property.

```js
new URI('../assets/kitten.jpg').toString() // "../assets/kitten.jpg"
```

#### toJSON

The `toJSON` method returns the whole URL as a string. It is a synonym for the `href` getter property.

```js
new URI('../assets/kitten.jpg').toJSON() // "../assets/kitten.jpg"
```

#### to

The `to` method returns a new URL resolved by the current URL.

```js
const kitten = new URI('../assets/kitten.jpg')

String(kitten.to('puppy.jpg')) // "../assets/puppy.jpg"
```



## Static Methods

#### from

The static `from` method returns a new URI resolved by the current source.

```js
const kitten = new URI('../assets/kitten.jpg')

String(kitten.to('puppy.jpg')) // "../assets/puppy.jpg"
```

---



## Impact

**URI** contributes approximately 42kB of JavaScript when unminified, or 14kB when minified, or 6kB when minified and compressed.

---



## License

Code original to this project is licensed under the CC0-1.0 License.

Code from [spec-url](https://www.npmjs.com/package/spec-url) is licensed under the The MIT License (MIT), Copyright Alwin Blok.
