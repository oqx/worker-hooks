import React from 'react'
import { Avatar } from './Avatar'

export const Card = () => {
    return (
        <div className="card">
            <div className="card__avatar">
                <Avatar />
            </div>
            <div className="card__body">
                <div className="card__heading" role="heading">
                    Jay Kariesch
                </div>
                <div className="card__subheading">Software Developer</div>
                <div className="card__cta">
                    <button className="btn" type="button">
                        Connect
                    </button>
                </div>
            </div>
        </div>
    )
}
