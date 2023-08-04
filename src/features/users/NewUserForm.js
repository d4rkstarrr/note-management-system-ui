import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import {
    MDBContainer,
    MDBCard, 
    MDBCardBody, 
    MDBInput, 
    MDBBtn, 
    MDBRow, 
    MDBCol
} from 'mdb-react-ui-kit'
import Select from 'react-select'
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        console.log(e)
        const values = Array.from(
            e, 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role =>  {
        const container = {};
        container['value'] = role
        container['label'] = role
        return container
    })

    const errClass = isError ? "errmsg" : "offscreen"
    // const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    // const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    // const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            {/* <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form> */}

            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                    <MDBCard className='bg-light my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                        
                        <p className={errClass}>{error?.data?.message}</p>

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
                            className="basic-single mt-3"
                            classNamePrefix="select"
                            defaultValue={options[0]}
                            isLoading={isLoading}
                            isSearchable
                            isMulti
                            options={options}
                            onChange={onRolesChanged}
                        />

                        <MDBBtn className='m-3 px-5 btn-primary' size='lg' onClick={onSaveUserClicked}>
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
export default NewUserForm