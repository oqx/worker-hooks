import React, { useEffect } from 'react'
import { Card } from './Card'
import { CommentsWorkers } from './comments/CommentsWorker'
import { iterations } from './workers/iterator.worker'
import { useWorker } from '../src'

const DemoWithWorker: React.FunctionComponent<{}> = () => {
    const { publish, data, loading, error } = useWorker(iterations)

    useEffect(() => {
        if (publish) {
            publish({ num: 5 })
        }
    }, [])
    return (
        <>
            <Card />
            <CommentsWorkers />
        </>
    )
}

DemoWithWorker.displayName = 'DemoWithWorker'

export default React.memo(DemoWithWorker)
