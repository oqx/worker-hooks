import React, { useEffect } from 'react'
import { Card } from './Card'
import { iterations } from './workers/iterator.worker'
import { Comments } from './Comments/Comments'

const Demo: React.FunctionComponent<{}> = () => {
    useEffect(() => {
        Promise.resolve().then(() => {
            iterations({ num: 5 })
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
