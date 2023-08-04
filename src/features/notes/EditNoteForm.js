import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import {
    MDBContainer,
    MDBCard, 
    MDBCardBody, 
    MDBInput, 
    MDBBtn, 
    MDBRow, 
    MDBCol,
    MDBTextArea,
    MDBCheckbox
} from 'mdb-react-ui-kit'
import Select from 'react-select'
import useAuth from "../../hooks/useAuth"

const EditNoteForm = ({ note, users }) => {

    console.log(users);
    console.log(note);
    const { isManager, isAdmin } = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)
    const [username, setUsername] = useState(note.username)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)

    const handleUserChange = e => {
        setUserId(e.value)
        setUsername(e.label)
    }
    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user =>  {
        const container = {};
        container['value'] = user.id
        container['label'] = user.username
        return container
    })

    const selectedOptions = {
        value: userId,
        label: username
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <MDBBtn className='mt-4 px-5 btn-danger' size='lg' onClick={onDeleteNoteClicked}>
                <FontAwesomeIcon icon={faTrashCan} /> Delete Note
            </MDBBtn>
        )
    }

    const content = (
        <>
            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                    <MDBCard className='bg-light my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                        
                        <p className={errClass}>{errContent}</p>

                        <MDBInput 
                            id="note-title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                            wrapperClass='mb-4 mx-5 w-100' 
                            labelClass='text-secondary' 
                            label='Username [3-20 letters]:' 
                            size="lg"
                            required
                        />

                        <MDBTextArea 
                            id="note-text"
                            name="text"
                            value={text}
                            onChange={onTextChanged}
                            labelClass='text-secondary' 
                            label='Task Description' 
                            rows={4}
                        />

                        <Select
                            id="note-username"
                            name="username"
                            value={selectedOptions}
                            onChange={handleUserChange}
                            className="basic-single mb-4 mt-4 w-100"
                            classNamePrefix="select"
                            defaultValue={options[0]}
                            isLoading={isLoading}
                            isSearchable
                            options={options}
                        />

                        <MDBCheckbox 
                            id="note-completed"
                            name="completed"
                            type="checkbox"
                            checked={completed}
                            onChange={onCompletedChanged}
                            className='mb-4' 
                            label='Task Completed'
                        />

                        <div className="form__divider">
                            <p className="form__created">Created: {created}</p>
                            <p className="form__updated">Updated: {updated}</p>
                        </div>

                        <MDBBtn className='px-5 btn-primary' size='lg' disabled={!canSave} onClick={onSaveNoteClicked}>
                            <FontAwesomeIcon icon={faSave} /> Save Note
                        </MDBBtn>

                        {deleteButton}

                        </MDBCardBody>
                    </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </>
    )

    return content
}

export default EditNoteForm