import React from 'react'
import History from './History'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'

function NavigateBack() {
    return (
        <span
            className="navigate-back"
            tooltip="Navigate back"
            flow="right"
            onClick={() => History.goBack()}
        >
            <ArrowLeft size={20} />
        </span>
    )
}

export default NavigateBack
