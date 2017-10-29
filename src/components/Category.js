import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const propTypes = {
  name: PropTypes.string.isRequired
}

function Category(props) {
  const linkAddress = `/categories/${props.name}`
  return (
    <div className="category">
      <h3><Link to={linkAddress}>{props.name}</Link></h3>
    </div>
  )
}

Category.propTypes = propTypes

export default Category


