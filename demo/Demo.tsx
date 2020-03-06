import React, { useEffect } from 'react'
import { Card } from './Card'
import { iterations } from './workers/iterator.worker'
import { Comments } from './Comments/Comments'

const Demo: React.FunctionComponent<{}> = () => {
    useEffect(() => {
        let promise = new Promise(resolve => resolve(iterations({ num: 5 })))
        promise.then(() => {
            console.log('Done.')
        })
    }, [])
    return (
        <div>
            <Card />
            <Comments />
        </div>
    )
}

Demo.displayName = 'Demo'

export default React.memo(Demo)
