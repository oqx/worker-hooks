import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Demo from './Demo'
import DemoWithWorker from './DemoWithWorker'
import Worker from './Worker'
export default () => {
    return (
        <>
            <h1
                style={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 100,
                    letterSpacing: '2px'
                }}
            >
                Choose a version
            </h1>
            <div className="btn-wrapper">
                <Link to="/without-worker">
                    <button className="btn btn--secondary" type="button">
                        Without Worker
                    </button>
                </Link>
                <Link to="/with-worker">
                    <button className="btn btn--secondary" type="button">
                        With Worker
                    </button>
                </Link>
                <Link to="/">
                    <button className="btn btn--14">Escape</button>
                </Link>
            </div>
            <Switch>
                <Route exact path="/without-worker">
                    <Demo />
                </Route>
                <Route path="/with-worker">
                    <DemoWithWorker />
                </Route>
                <Route path="/">
                    <Worker />
                </Route>
            </Switch>
        </>
    )
}
