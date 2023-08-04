import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
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
    MDBCheckbox
} from 'mdb-react-ui-kit'
import Select from 'react-select'
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e, 
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role =>  {
        const container = {};
        container['value'] = role
        container['label'] = role
        return container
    })

    const selectedOptions = roles.map(role => {
        const container = {};
        container['value'] = role
        container['label'] = role
        return container
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                    <MDBCard className='bg-light my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                        
                        <p className={errClass}>{errContent}</p>

                        <MDBInput 
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={username}
                            onChange={onUsernameChanged}
                            wrapperClass='mb-4 mx-5 w-100' 
                            labelClass='text-secondary' 
                            label='Username [3-20 letters]:' 
                            size="lg"
                            required
                        />

                        <MDBInput 
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChanged}
                            wrapperClass='mb-4 mx-5 w-100' 
                            labelClass='text-secondary' 
                            label='Password [4-12 chars incl. !@#$%]:' 
                            size="lg"
                            required
                            autoComplete="off"
                        />

                        <Select
                            id="roles"
                            name="roles"
                            className="basic-single mb-4"
                            classNamePrefix="select"
                            isLoading={isLoading}
                            isSearchable
                            isMulti
                            options={options}
                            defaultValue={selectedOptions}
                            onChange={onRolesChanged}
                        />

                        <MDBCheckbox 
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            className='mb-4' 
                            label='Active User'
                            checked={active}
                            onChange={onActiveChanged}
                        />

                        <MDBBtn className='mb-4 px-5 btn-primary' size='lg' disabled={!canSave} onClick={onSaveUserClicked}>
                            <FontAwesomeIcon icon={faSave} /> Save User
                        </MDBBtn>
                        <MDBBtn className='px-5 btn-danger' size='lg' onClick={onDeleteUserClicked}>
                            <FontAwesomeIcon icon={faTrashCan} /> Delete User
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
export default EditUserForm