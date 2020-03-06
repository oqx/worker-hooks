import { useWorkerBase } from './UseWorkerBase'
import { Options } from './types'

type Fn = (data?: any) => void

/**
 * @summary Creates an inline WebWorker to offload tasks from the main thread. Accepts a Function with a single argument for input data.
 * @param fn Function or Module.
 * @param options
 */
export const useWorker = <TData = any>(fn: Fn, options?: Options<TData>) =>
    useWorkerBase<TData>(fn, options)
