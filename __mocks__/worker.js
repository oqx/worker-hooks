/*
    This is a fork of @react-frontend-developer/jsdom-worker
    It was forked in order to remove the Error that's thrown on
    terminate. That was breaking tests.
*/
function _interopDefault(e) {
    return e && 'object' == typeof e && 'default' in e ? e.default : e
}
var mitt = _interopDefault(require('mitt')),
    uuid = _interopDefault(require('uuid-v4')),
    fetch = require('node-fetch'),
    fetch__default = _interopDefault(fetch)
if (
    (global.URL || (global.URL = {}),
    global.URL.$$objects ||
        ((global.URL.$$objects = new Map()),
        (global.URL.createObjectURL = function(e) {
            var t = uuid()
            return (global.URL.$$objects[t] = e), 'blob:http://localhost/' + t
        }),
        (global.URL.createObjectURL.jsdomWorker = !0)),
    global.URL.createObjectURL.jsdomWorker &&
        (!global.fetch || !global.fetch.jsdomWorker))
) {
    var oldFetch = global.fetch || fetch__default
    ;(global.fetch = function(e, t) {
        return e.match(/^blob:/)
            ? new Promise(function(t, o) {
                  var n = new FileReader()
                  ;(n.onload = function() {
                      var e = global.Response || fetch.Response
                      t(new e(n.result, { status: 200, statusText: 'OK' }))
                  }),
                      (n.onerror = function() {
                          o(n.error)
                      })
                  var s = e.match(/[^/]+$/)[0]
                  n.readAsText(global.URL.$$objects[s])
              })
            : oldFetch.call(this, e, t)
    }),
        (global.fetch.jsdomWorker = !0)
}
function Event(e) {
    this.type = e
}
global.document || (global.document = {}),
    (Event.prototype.initEvent = Object),
    global.document.createEvent ||
        (global.document.createEvent = function(e) {
            return new (global[e] || Event)(e)
        }),
    (global.Worker = function Worker(url) {
        var this$1 = this,
            messageQueue = [],
            inside = mitt(),
            outside = mitt(),
            scope = {
                onmessage: null,
                dispatchEvent: inside.emit,
                addEventListener: inside.on,
                removeEventListener: inside.off,
                postMessage: function(e) {
                    outside.emit('message', { data: e })
                },
                fetch: global.fetch,
                importScripts: function() {
                    for (var e = [], t = arguments.length; t--; )
                        e[t] = arguments[t]
                }
            },
            getScopeVar
        inside.on('message', function(e) {
            var t = getScopeVar('self.onmessage') || getScopeVar('onmessage')
            t && t.call(scope, e)
        }),
            (this.addEventListener = outside.on),
            (this.removeEventListener = outside.off),
            (this.dispatchEvent = outside.emit),
            outside.on('message', function(e) {
                this$1.onmessage && this$1.onmessage(e)
            }),
            (this.postMessage = function(e) {
                null != messageQueue
                    ? messageQueue.push(e)
                    : inside.emit('message', { data: e })
            }),
            (this.terminate = function() {
            }),
            global
                .fetch(url)
                .then(function(e) {
                    return e.text()
                })
                .then(function(code) {
                    var vars = 'var self=this,global=self'
                    for (var k in scope) vars += ',' + k + '=self.' + k
                    getScopeVar = eval(
                        '(function() {' +
                            vars +
                            ';\n' +
                            code +
                            '\nreturn function(__){return eval(__)}})'
                    ).call(scope)
                    var q = messageQueue
                    ;(messageQueue = null), q.forEach(this$1.postMessage)
                })
                .catch(function(e) {
                    outside.emit('error', e), console.error(e)
                })
    })
//# sourceMappingURL=jsdom-worker.js.map
