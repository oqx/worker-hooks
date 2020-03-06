const mitt = require('mitt')

module.exports = class Worker {
    private outside = mitt()
    private inside = mitt()
    private messageQueue = []
    private url = ''
    private scope = {
        onmessage: null,
        dispatchEvent: this.inside.emit,
        addEventListener: this.inside.on,
        removeEventListener: this.inside.off,
        postMessage(data) {
            this.outside.emit('message', { data })
        },
        fetch: fetch,
        importScripts(...urls) {}
    }
    private getScopeVar
    private removeEventListener = this.outside.off
    private dispatchEvent = this.outside.emit

    constructor(url) {
        this.url = url

        this.getScopeVar

        this.inside.on('message', e => {
            let f = this.getScopeVar('onmessage')
            if (f) f.call(this.scope, e)
        })

        this.outside.on('message', e => {
            this.onmessage && this.onmessage(e)
        })
    }

    addEventListener() {
        return this.outside.on
    }

    postMessage(data) {
        if (this.messageQueue != null) this.messageQueue.push(data)
        else this.inside.emit('message', { data })
    }

    terminate() {
        return null
    }

    setup() {
        fetch(this.url)
            .then(r => r.text())
            .then(code => {
                let vars = 'var self=this,global=self'
                for (let k in this.scope) vars += `,${k}=self.${k}`
                this.getScopeVar = eval(
                    '(function() {' +
                        vars +
                        ';\n' +
                        code +
                        '\nreturn function(__){return eval(__)}})'
                ).call(this.scope)
                let q = this.messageQueue
                this.messageQueue = null
                q.forEach(this.postMessage)
            })
            .catch(e => {
                this.outside.emit('error', e)
                console.error(e)
            })
    }
}
