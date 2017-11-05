import React from 'react'
import { Button, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

const propTypes = {
    saveChanges: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired
}

// TODO: on cancel a function has to be called that undos the state changes - one possibility is to
//  simply get the data from the server again für that comment or post

function EditItemModalFooter(props) {
    return (
        <ModalFooter>
            <Button
                color="primary"
                onClick={() => props.saveChanges()}
            >
                Save
            </Button>
            <Button
                color="secondary"
                onClick={() => props.toggleModal()}
            >
                Cancel
            </Button>
        </ModalFooter>
    )
}

EditItemModalFooter.propTypes = propTypes

export default EditItemModalFooter
