/**
 * Creates an inline web worker by coverting a function to an blob.
 * @param {function} fn A function to be read as a web worker.
 * @param {boolean} prefix Indicates whether to apply self.onmessage web worker boilerplate when generating an inline web worker.
 * @returns Worker
 */
export const createWorker = (
    fn: Function | Object,
    callback: boolean = true
) => {
    const blob = new Blob(
        [
            callback
                ? `self.onmessage = function(data) { var serialize = function(val) { return JSON.stringify(val) }; var func = ${fn.toString()}; var publish = (data) => self.postMessage(serialize(data)); func(data, publish) }`
                : `self.onmessage = function(data) { var serialize = function(val) { return JSON.stringify(val) }; var func = ${fn.toString()}; self.postMessage(serialize(func(data))) }`
        ],
        {
            type: 'text/javascript'
        }
    )
    const url = URL.createObjectURL(blob)
    return {
        worker: new Worker(url),
        url: url
    }
}

/**
 * Checks whether a value is a class object.
 * @param {Function | Object} fn Value to test.
 * @returns {boolean} True or false
 */
export const isClass = (fn: Function | Object = {}) =>
    /^\s*class/.test(fn.toString())

export const isWorker = (worker: Worker) =>
    worker instanceof Worker || typeof worker === 'function'

export const throwInstanceError = () => {
    throw new Error('[ useWorker ]: Worker has not been instantiated.')
}
/**
 * Ensures function is not a class or primative.
 * @param {function} fn Function to test.
 * @returns {boolean | Error} true or Error.
 */
export const validateFnType = (fn: Function | Object) =>
    isClass(fn)
        ? new Error('useWorker is incompatible with classes.')
        : typeof fn === 'function'
        ? true
        : typeof fn === 'object'
        ? true
        : (fn as any).hasOwnProperty.default
        ? true
        : new Error(
              `useWorker requires argument of function, or object. Instead received ${typeof fn}`
          )
