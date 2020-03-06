export type Index = {
    [key: string]: any
}

export type State<TData = any> = {
    /*
        Data sent by the WebWorker
     */
    data: TData | null
    /*
        Indicates whether an error has occurred.
    */
    error: boolean
    /*
        Indicates whether the webworker is working.
    */
    loading: boolean
    key: any
    /**
     * A method used to publish data to the WebWorker.
     * @param data Data to be sent to the WebWorker
     */
    publish(data?: any): void
    /**
     * The WebWorker's terminate method.
     */
    terminate: Worker['terminate']
}

export type Options<TResult> = {
    /*
        A callback that WebWorker results are passed into. A clean way to pass WebWorker data to state.
    */
    onCompleted?(data: TResult): void
    /*
        A callback that an ErrorEvent is passed into. The difference between this and 'error' in the state object is this has messaging and thangs.
    */
    onError?(error: ErrorEvent): void
}
