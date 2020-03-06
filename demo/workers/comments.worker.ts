export function getComments(_data, post) {
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
            post(payload, null)
        })
}
