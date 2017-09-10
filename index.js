const pull = require('pull-stream')
const Next = require('pull-next')

const get = require('lodash.get')

module.exports = nextStepper

// TODO - this should be another module?

function nextStepper (createStream, opts) {
  const range = opts.range || (opts.reverse ? 'lt' : 'gt')
  const property = opts.property || 'timestamp'
  delete opts.range
  delete opts.property

  var last = null
  var count = -1

  return Next(() => {
    if (last) {
      if (count === 0) return
      var value = opts[range] = get(last, property)
      if (value == null) return
      last = null
    }

    return pull(
      createStream(Object.assign({}, opts)),
      pull.through(
        (msg) => {
          count++
          if (!msg.sync) {
            last = msg
          }
        }, 
        (err) => {
            // retry on errors...
          if (err) {
            count = -1
            return count
          }
          // end stream if there were no results
          if (last == null) last = {}
        }
      )
    )
  })
}

