import { act, cleanup } from '@testing-library/react'
import { useWorker } from '../src'
import { renderHook } from '@testing-library/react-hooks'
import { createWorker } from '../src/utils'
import '@react-frontend-developer/jsdom-worker'

const DATA = {
    hello: 'world'
}

afterEach(cleanup)

describe('useWorker', () => {
    it('initialize a Worker', () => {
        const cb = () => {
            return DATA
        }
        const { worker } = createWorker(cb)
        expect(worker).toBeInstanceOf(window.Worker)
    })
    it('should postMessage', () => {
        const cb = (data: any) => {
            return data
        }

        const { worker } = createWorker(cb)
        worker.postMessage = jest.fn()

        worker.postMessage({ data: 'foo' })
        expect(worker.postMessage).toHaveBeenCalled()
    })
    it("useWorker hook's onCompleted callback should return data on complete", async () => {
        const cb = (data: any) => {
            return data
        }
        try {
            const { result, waitForNextUpdate } = renderHook(() =>
                useWorker(cb, {
                    onCompleted({ data }) {
                        expect(data).toEqual(DATA)
                    }
                })
            )

            await act(async () => {
                if (result.current.publish) {
                    result.current.publish(DATA)
                }
                await waitForNextUpdate()
            })
        } catch (err) {
            throw new Error(err)
        }
    })
})
