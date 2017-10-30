import React from 'react'
import { Button, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

const propTypes = {
    saveChanges: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired
}

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
