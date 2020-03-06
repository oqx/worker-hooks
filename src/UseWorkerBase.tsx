import { useEffect, useState } from 'react'
import { State, Options } from './types'
import * as fromUtils from './utils'

const cache = {} as any

/**
 * @summary Creates an inline WebWorker to offload tasks from the main thread. Accepts a Function or Module.
 * @param fn Function or Module.
 * @param options
 */
export function useWorkerBase<TData = any>(
    fn: Function,
    options?: Options<TData>,
    callback = false
): Omit<State<TData>, 'key'> {
    /*
        Ensure fn is valid
    */
    const type = fromUtils.validateFnType(fn)

    if (type instanceof Error) throw type

    const [key] = useState<State['key']>(Symbol('Worker.Id'))
    const [data, setData] = useState<State<TData>['data']>(null)
    const [loading, setLoading] = useState<State['loading']>(false)
    const [error, setError] = useState<State['error']>(false)

    const deserialize = (data: any) => JSON.parse(data)

    /**
     * @summary A method used to publish data to the WebWorker.
     * @param data Data to be sent to the WebWorker
     */
    const publish = (data: any) => {
        if (!fromUtils.isWorker(cache[key])) {
            fromUtils.throwInstanceError()
        }
        cache[key as any].postMessage(data)
        setLoading(true)
    }

    /**
     * @summary Handles errors from the WebWorker and triggers a error state update.
     * @param {ErrorEvent} error
     */
    const onWorkerError = (error: ErrorEvent) => {
        if (options?.onError) options?.onError(error)
        setLoading(true)
        setError(true)
    }

    /**
     * @summary Handles data posted by a WebWorker _**and**_ triggers a data state update.
     * @param {MessageEvent} event
     */
    const onWorkerMessage = ({ data }: MessageEvent) => {
        const result = deserialize(data)
        if (options?.onCompleted) options?.onCompleted(result)
        setLoading(false)
        setData(result)
    }

    /**
     * @summary Creates the WebWorker and triggers a state update to expose publish and terminate methods..
     */
    const initWorker = () => {
        const { worker: _worker } = fromUtils.createWorker(fn, callback)
        cache[key] = _worker
        if (!fromUtils.isWorker(cache[key])) {
            fromUtils.throwInstanceError()
        }
        // setPublish(_publish)

        cache[key].onmessage = onWorkerMessage

        cache[key].onerror = onWorkerError
    }

    useEffect(() => {
        try {
            initWorker()
        } catch (err) {
            if (options?.onError) options?.onError(err)
            setError(true)
        }

        return () => {
            cache[key]?.terminate()
            delete cache[key]
        }
    }, [])

    return {
        loading,
        error,
        publish,
        data,
        terminate: cache[key] ? cache[key].terminate : () => {}
    }
}
