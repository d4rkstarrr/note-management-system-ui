import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import {
    MDBContainer,
    MDBCard, 
    MDBCardBody, 
    MDBInput, 
    MDBBtn, 
    MDBRow, 
    MDBCol, 
    MDBTextArea
} from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import Select from 'react-select'

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user =>  {
        const container = {};
        container['value'] = user.id
        container['label'] = user.username
        return container
    })

    const errClass = isError ? "errmsg" : "offscreen"

    const content = (
        <>
            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                    <MDBCard className='bg-light my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                        
                        <p className={errClass}>{error?.data?.message}</p>

                        <MDBInput 
                            wrapperClass='mb-4 mx-5 w-100' 
                            labelClass='text-secondary' 
                            label='Title' 
                            size="lg"
                            required
                            id="title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                        />

                        <MDBTextArea 
                            labelClass='text-secondary' 
                            label='Task Description' 
                            id='text' 
                            rows={4}
                            value={text}
                            onChange={onTextChanged}
                        />

                        <Select
                            className="basic-single mt-3"
                            classNamePrefix="select"
                            defaultValue={options[0]}
                            isLoading={isLoading}
                            isSearchable
                            name="User"
                            options={options}
                            onChange={onUserIdChanged}
                        />

                        <MDBBtn className='m-3 px-5 btn-primary' size='lg' onClick={onSaveNoteClicked}>
                            <FontAwesomeIcon icon={faSave} /> Save
                        </MDBBtn>

                        </MDBCardBody>
                    </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </>
    )

    return content
}

export default NewNoteForm