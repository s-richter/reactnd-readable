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
        })
    }

    state = {
        author: '',
        title: '',
        body: '',
        category: ''
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
            category: post.category
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
            title: this.state.title,
            body: this.state.body,
            category: this.state.category,
            timestamp: Date.now()
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
        const { author, title, body, category } = this.state
        return (
            <Modal
                isOpen={isVisible}
                toggle={toggleModal}
            >
                <ModalHeader toggle={toggleModal}>Edit Post</ModalHeader>
                <ModalBody>
                    {/* title */}
                    <EditItemInput
                        label="Post Title"
                        value={title}
                        name="title"
                        onChange={(name, value) => this.onChange("title", value)}
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
                </ModalBody>
                <EditItemModalFooter
                    onSaveChanges={this.onSaveChanges}
                    onDiscardChanges={this.onDiscardChanges} />
            </Modal>
        )
    }
}
