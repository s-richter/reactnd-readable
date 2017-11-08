import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types'
import EditItemInput from './EditItemInput'
import EditItemTextArea from './EditItemTextArea'
import EditItemModalFooter from './EditItemModalFooter'

export default class EditCommentForm extends Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        toggleModal: PropTypes.func.isRequired,
        saveChanges: PropTypes.func.isRequired,
        comment: PropTypes.shape({
            id: PropTypes.string.isRequired,
            parentId: PropTypes.string.isRequired,
            timestamp: PropTypes.number.isRequired,
            body: PropTypes.string,
            author: PropTypes.string.isRequired,
            voteScore: PropTypes.number.isRequired,
            deleted: PropTypes.bool,
            parentDeleted: PropTypes.bool
        })
    }

    state = {
        author: '',
        body: ''
    }

    componentDidMount() {
        this.initializeFormFields()
    }

    initializeFormFields = () => {
        const { comment } = this.props
        this.setState({
            author: comment.author,
            body: comment.body
        })
    }

    onChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    onSaveChanges = () => {
        const values = {
            author: this.state.author,
            body: this.state.body
        }
        this.props.saveChanges(values)
        this.props.toggleModal()
    }

    onDiscardChanges = () => {
        this.initializeFormFields()
        this.props.toggleModal()
    }

    render() {
        const { isVisible, toggleModal } = this.props
        const { author, body } = this.state
        return (
            <Modal
                isOpen={isVisible}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal}>Edit Comment</ModalHeader>
                <ModalBody>
                    {/* author */}
                    <EditItemInput
                        label="Author"
                        value={author}
                        name="author"
                        onChange={(name, value) => this.onChange("author", value)}
                    />

                    {/* message */}
                    <EditItemTextArea
                        label="Message"
                        value={body}
                        name="body"
                        onChange={(name, value) => this.onChange("body", value)}
                    />
                </ModalBody>
                <EditItemModalFooter
                    onSaveChanges={this.onSaveChanges}
                    onDiscardChanges={this.onDiscardChanges} />
            </Modal>
        )
    }
}
