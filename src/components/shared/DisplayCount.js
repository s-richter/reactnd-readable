import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    number: PropTypes.number.isRequired,
    colorize: PropTypes.bool
}

// displays a number in the format 1.2k, -2.5M etc, if the number is bigger than 999
//  NOTE: part of the function logic was taken and modified from Stack Overflow
//  (https://stackoverflow.com/questions/2692323/code-golf-friendly-number-abbreviator)
function DisplayCount(props) {

    const number = props.number
    const sign = number < 0 ? "-" : ""
    const numberAbs = Math.abs(number)
    const count =
        Math.abs(number) < 1000
            ? numberAbs
            : (() => {
                let length = ('' + numberAbs).length
                return ((numberAbs * 10 / Math.pow(10, length -= length % 3)) + .5 | 0) / 10 +
                    ' kMGTPE'[length / 3]
            })()
    const style =
        props.colorize
            ? number >= 0
                ? "green"
                : "red"
            : "black"

    return (
        <div
            className="display-count"
            style={{
                color: `${style}`
            }}
        >
            {sign}{count}
        </div>
    )
}

DisplayCount.propTypes = propTypes

export default DisplayCount

