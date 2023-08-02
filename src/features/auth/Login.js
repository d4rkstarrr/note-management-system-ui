import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBInputGroup,
    MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBBtn, MDBRow, MDBCol, MDBNavbarBrand
} from 'mdb-react-ui-kit'

const Login = () => {

    useTitle('Employee Login')

    const userRef = useRef()
    const errRef = useRef()
    const [showNavColorSecond, setShowNavColorSecond] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response. Please try again later.');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized.');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <PulseLoader size={50} color={"#FFF"} />

    const content = (
        <section>
            <header>
                <MDBNavbar expand='lg' dark bg-transparent="true">
                    <MDBContainer fluid>
                        <MDBNavbarBrand>
                            <img
                            src='../img/logo.png'
                            height='30'
                            alt=''
                            loading='lazy'
                            />
                        </MDBNavbarBrand>
                        <MDBNavbarToggler
                            type='button'
                            data-target='#navbarColor02'
                            aria-controls='navbarColor02'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                            onClick={() => setShowNavColorSecond(!showNavColorSecond)}
                        >
                            <MDBIcon icon='bars' fas />
                        </MDBNavbarToggler>
                        <MDBCollapse show={showNavColorSecond} navbar id='navbarColor02'>
                            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 text-center'>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/'>Task Management System</MDBNavbarLink>
                                </MDBNavbarItem>
                            </MDBNavbarNav>
                            <MDBInputGroup tag="form" className='d-flex w-auto'>
                            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 text-center'>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/'>Home</MDBNavbarLink>
                                </MDBNavbarItem>
                            </MDBNavbarNav>
                            </MDBInputGroup>
                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>
            </header>
            <main>
                <MDBContainer fluid>

                    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                        <MDBCol col='12'>

                        <MDBCard className='bg-dark text-white-50 my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                            
                            <div className='text-danger'>
                                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                            </div>

                            <img
                                src='../img/tasktrack.png'
                                height='100'
                                alt=''
                                loading='lazy'
                                className='rounded-circle'
                            />

                            <p className="mt-2 mb-2">Sign In</p>

                            <MDBInput 
                                wrapperClass='mb-4 mx-5 w-100' 
                                labelClass='text-secondary' 
                                label='Username' 
                                id='username'
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                autoComplete="off"
                                type='text' 
                                size="lg"
                                required
                            />

                            <MDBInput 
                                wrapperClass='mb-4 mx-5 w-100' 
                                labelClass='text-secondary' 
                                label='Password' 
                                id='password'
                                onChange={handlePwdInput}
                                value={password}
                                type='password' 
                                size="lg"
                                required
                            />

                            <MDBCheckbox 
                                name='flexCheck' 
                                id='persist' 
                                className='mb-4' 
                                onChange={handleToggle} 
                                label='Remember Me'
                                checked={persist}
                            />

                            <MDBBtn className='mx-2 px-5 btn-primary' size='lg' onClick={handleSubmit}>
                                Login
                            </MDBBtn>

                            </MDBCardBody>
                        </MDBCard>

                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </main>
        </section>
    )

    return content
}
export default Login