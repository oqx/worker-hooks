import React from 'react'

export default () => (
    <div className="container">
        <div className="loading-overlay"></div>
        <button>hide</button>
        <div className="loading-anim">
            <div className="border out"></div>
            <div className="border in"></div>
            <div className="border mid"></div>
            <div className="circle">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    </div>
)
