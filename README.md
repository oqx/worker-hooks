# Worker Hooks
Hooks that remove the cognitive overhead of implementing web workers.

Worker Hooks execute web workers inline, exposing a simple API to interact with a worker's native API, and simplify the process of sending and receiving data.

## Usage

### useWorker

useWorker accepts any callback and sends the returned value back through the hook and into the component. It makes using web workers simple and idiomatic.

```
const { loading, data, publish } = useWorker<TResponse>(() => {
    return accounts.filter((account) => type === 'DEBIT')
})

if(loading) {
    return 'Loading...'
}

if(data) {
    return (<div>{data.accounts.map(account => <div>{account.balance}</div>)}</div>)
}

return null

```

### useWorkerCallback

Web workers cannot send a promise across threads, though the procedure to send data from within a promise to the outside world is easy enough. `useWorkerCallback` exposes a `publish` function that allows data to be sent across threads, which is `self.sendMessage` camolflauged as a callback method.

```
const { loading, data, publish } = useWorkerCallback<TResponse>((_data, publish) => {
    fetch('/accounts')
        .then(data => data.json())
        .then(accounts => {
            const debitAccounts = accounts.filter((account) => type === 'DEBIT')
            publish(debitAccounts)
        })
})

if(loading) {
    return 'Loading...'
}

if(data) {
    return (<div>{data.accounts.map(account => <div>{account.balance}</div>)}</div>)
}

return null
```

## Options 

Options accepts two callbacks:

### onCompleted

```
const [data, setData] = useState()

const { loading, publish } = useWorker<TResponse>(() => {
    return accounts.filter((account) => type === 'DEBIT')
}, {
    onCompleted(data) {
        setData(data)
    }
})
```

### onError

```
const { loading, publish } = useWorker<TResponse>(() => {
    return accounts.filter((account) => type === 'DEBIT')
}, {
    onError(error: ErrorEvent) {
        someLogger(error)
    }
})
```

These options are applicable to both `useWorker` and `useWorkerCallback`.

## Demo

The demo demonstrates performance differences, using an iteration to mimmick the loading of enterprise analytics libraries and management tools.

Since all business logic in the web worker version is delegated to web workers, there's little blocking in the UI as the event loop queue in the main thread is minimized to ReactJS, whereas blocking occurs when the same functions are ran asyncronously in the non-web worker demo.

```
$ npm i
$ npm start
```