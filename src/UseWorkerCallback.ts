import { useWorkerBase } from './UseWorkerBase'
import { Options } from './types'
type Fn<TData> = (data: any, publish: (data: TData) => void) => void

export const useWorkerCallback = <TData = any>(
    fn: Fn<TData>,
    options?: Options<TData>
) => useWorkerBase(fn, options, true)
