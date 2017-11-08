import React from 'react'
import { Button, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

const propTypes = {
    onSaveChanges: PropTypes.func.isRequired,
    onDiscardChanges: PropTypes.func.isRequired
}

function EditItemModalFooter(props) {
    return (
        <ModalFooter>
            <Button
                color="primary"
                onClick={() => props.onSaveChanges()}
            >
                Save
            </Button>
            <Button
                color="secondary"
                onClick={() => props.onDiscardChanges()}
            >
                Cancel
            </Button>
        </ModalFooter>
    )
}

EditItemModalFooter.propTypes = propTypes

export default EditItemModalFooter
