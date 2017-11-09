import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types'
import EditItemInput from './EditItemInput'
import EditItemSelect from './EditItemSelect'
import EditItemTextArea from './EditItemTextArea'
import EditItemModalFooter from './EditItemModalFooter'

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

    state = {
        author: '',
        title: '',
        body: '',
        category: '',
        hasErrors: false
    }

    componentDidMount() {
        this.initializeFormFields()
    }

    initializeFormFields = () => {
        const { post } = this.props
        this.setState({
            author: post.author,
            title: post.title,
            body: post.body,
            category: post.category,
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
                title: this.state.title,
                body: this.state.body,
                category: this.state.category,
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
