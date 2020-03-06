import React, { useState, useEffect } from 'react'
import Loading from '../loading'

export const _Comments = () => {
    const [comments, setComments] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        const shortenString = (comment, length) => {
            let str = comment.split(' ')
            str = str.slice(0, length)
            return str.join(' ') + '...'
        }

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(resp => {
                return resp.json()
            })
            .then((data: any) => {
                const payload = data.map(post =>
                    Object.assign(post, {
                        body: shortenString(post.body, 7),
                        title: shortenString(post.title, 4)
                    })
                )
                setComments(payload)
                setLoading(false)
            })
    }, [])

    if (loading || !comments) {
        return <Loading />
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

export const Comments = React.memo(_Comments)

// https://jsonplaceholder.typicode.com/posts
