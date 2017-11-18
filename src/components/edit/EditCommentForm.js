import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types'
import EditItemInput from './EditItemInput'
import EditItemTextArea from './EditItemTextArea'
import EditItemModalFooter from './EditItemModalFooter'

// the component that enables the user to edit a comment. This can also be a new comment.
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

    // local state - as long as the user doesn't want to save or cancel, the global store
    //  doesn't care about this information
    state = {
        author: '',
        body: '',
        hasErrors: false
    }

    resetFormFields = () => {
        const { comment } = this.props
        this.setState({
            author: comment.author,
            body: comment.body,
            hasErrors: false
        })
    }

    componentDidMount() {
        this.resetFormFields()
    }

    // in case the edit comment form is opened again immediately after saving, the contents of the
    //  fields have to be reset
    componentWillReceiveProps() {
        this.resetFormFields()
    }

    onChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    onSaveChanges = () => {
        if (this.validateForm()) {
            // now the local state is saved in the global store
            const values = {
                author: this.state.author,
                body: this.state.body,
                timestamp: Date.now()
            }
            this.setState({ hasErrors: false })
            this.props.saveChanges(values)
            this.props.toggleModal()
        } else {
            this.setState({ hasErrors: true })
        }
    }

    onDiscardChanges = () => {
        this.resetFormFields()
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
