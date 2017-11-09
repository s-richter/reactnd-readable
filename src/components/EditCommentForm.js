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
        }),
        isNewComment: PropTypes.bool.isRequired
    }

    state = {
        author: '',
        body: '',
        hasErrors: false
    }

    componentDidMount() {
        this.initializeFormFields()
    }

    initializeFormFields = () => {
        const { comment } = this.props
        this.setState({
            author: comment.author,
            body: comment.body,
            hasErrors: false
        })
    }

    onChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    onSaveChanges = () => {
        if (this.validateForm()) {
            const values = {
                author: this.state.author,
                body: this.state.body,
                timestamp: Date.now()
            }
            this.setState({ hasErrors: false })
            this.props.saveChanges(values)
            // clear the fields after the comment was saved
            this.initializeFormFields()
            this.props.toggleModal()
        } else {
            this.setState({ hasErrors: true })
        }
    }

    onDiscardChanges = () => {
        this.initializeFormFields()
        this.props.toggleModal()
    }

    validateForm = () => {
        // just some basic validation
        const { author, body } = this.state
        return author
            && author !== ""
            && body
            && body !== ""
    }

    render() {
        const { isVisible, toggleModal, isNewComment } = this.props
        const { author, body, hasErrors } = this.state
        return (
            <Modal
                isOpen={isVisible}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal}>
                    {
                        isNewComment
                            ? "Add new comment"
                            : "Edit comment"
                    }
                </ModalHeader>
                <ModalBody>
                    {/* author */}
                    <EditItemInput
                        label="Author"
                        value={author}
                        name="author"
                        onChange={(name, value) => this.onChange("author", value)}
                        autoFocus
                    />

                    {/* message */}
                    <EditItemTextArea
                        label="Message"
                        value={body}
                        name="body"
                        onChange={(name, value) => this.onChange("body", value)}
                    />

                    {/* error message */}
                    {
                        hasErrors
                            ? <div className="edit-form-error-message">
                                Please enter a valid author and message.
                            </div>
                            : ""
                    }
                </ModalBody>
                <EditItemModalFooter
                    onSaveChanges={this.onSaveChanges}
                    onDiscardChanges={this.onDiscardChanges} />
            </Modal>
        )
    }
}
