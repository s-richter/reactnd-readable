import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types'
import EditItemInput from './EditItemInput'
import EditItemSelect from './EditItemSelect'
import EditItemTextArea from './EditItemTextArea'
import EditItemModalFooter from './EditItemModalFooter'

// the component that enables the user to edit a post. This can also be a new post.
export default class EditPostForm extends Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        toggleModal: PropTypes.func.isRequired,
        saveChanges: PropTypes.func.isRequired,
        post: PropTypes.shape({
            id: PropTypes.string.isRequired,
            timestamp: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string,
            author: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            voteScore: PropTypes.number.isRequired,
            deleted: PropTypes.bool,
            commentCount: PropTypes.number.isRequired
        }),
        isNewPost: PropTypes.bool.isRequired
    }

    // local state - as long as the user doesn't want to save or cancel, the global store
    //  doesn't care about this information
    state = {
        author: '',
        title: '',
        body: '',
        category: '',
        hasErrors: false
    }

    resetFormFields = () => {
        const { post } = this.props
        this.setState({
            author: post.author,
            title: post.title,
            body: post.body,
            category: post.category,
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
                title: this.state.title,
                body: this.state.body,
                category: this.state.category,
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
        const { author, title, body } = this.state
        return author && author !== ""
            && title && title !== ""
            && body && body !== ""
    }

    render() {
        const { isVisible, toggleModal, isNewPost } = this.props
        const { author, title, body, category, hasErrors } = this.state
        return (
            <Modal
                isOpen={isVisible}
                toggle={toggleModal}
                keyboard={true}
                autoFocus={true}
            >
                <ModalHeader toggle={toggleModal}>
                    {
                        isNewPost
                            ? "Add new post"
                            : "Edit post"
                    }
                </ModalHeader>
                <ModalBody>
                    {/* title */}
                    <EditItemInput
                        label="Post Title"
                        value={title}
                        name="title"
                        onChange={(name, value) => this.onChange("title", value)}
                        autoFocus
                    />

                    {/* author */}
                    <EditItemInput
                        label="Author"
                        value={author}
                        name="author"
                        onChange={(name, value) => this.onChange("author", value)}
                    />

                    {/* category */}
                    <EditItemSelect
                        label="Category"
                        value={category}
                        name="category"
                        onChange={(name, value) => this.onChange("category", value)}
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
                                Please enter a valid author, title and message.
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
