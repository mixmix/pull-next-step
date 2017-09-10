# pull-next-step


## Example

```js
const pull = require('pull-stream')
const next = require('pull-next-step')

pull(
  next(api.feed.pull.private, { old: false, limit: 100, property: ['value', 'timestamp'] }),
  pull.filter(someFilter),
  pull.drain(api.message.html.render)
)
```

## API

### `next(createStream, { ...opts, property, range })`

`createStream` - a function that creates a pull-stream will `opts`

`opts` - the keys from the second argument that are neither `property`, now `range`

`property` - the property we'll be stepping on. Expects a `lodash/get` style path (either a string or an array), defaults to `"timestamp"`

`range` - either `lt` or `gt`. Can be set implicitly by setting `opts.reverse`

