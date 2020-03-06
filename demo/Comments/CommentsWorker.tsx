import React, { useState, useEffect } from 'react'
import { useWorkerCallback } from '../../src'
import { getComments } from '../workers/comments.worker'

export const _CommentsWorkers = () => {
    const [comments, setComments] = useState()
    const { publish, loading } = useWorkerCallback(getComments, {
        onCompleted(data) {
            setComments(data)
        },
        onError(err) {
            console.error(err)
        }
    })

    useEffect(() => {
        if (publish) {
            publish({})
        }
    }, [])

    if (loading || !comments) {
        return <div>loading...</div>
    }

    return (
        <div className="sidebar">
            {comments.map(comment => (
                <div key={comment.id}>
                    <h3>{comment.title}</h3>
                    <div>{comment.body}</div>
                </div>
            ))}
        </div>
    )
}

export const CommentsWorkers = React.memo(_CommentsWorkers)
