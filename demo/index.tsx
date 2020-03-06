import { render } from 'react-dom'
import React from 'react'
import Choose from './Choose'
import { BrowserRouter as Router } from 'react-router-dom'

/**
 * @author Jay Kariesch
 */
const setup = () => {
    /*
    Instantiate instance of apollo client.
    */
    const ROOT = document.querySelector('#app')

    // ROOT && render(<Demo />, ROOT)
    ROOT &&
        render(
            <Router>
                <Choose />
            </Router>,
            ROOT
        )
}

setup()
