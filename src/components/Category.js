import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  name: PropTypes.string.isRequired
}

function Category(props) {
  return (
    <div className="category">
      <h3>{props.name}</h3>
    </div>
  )
}

Category.propTypes = propTypes

export default Category



