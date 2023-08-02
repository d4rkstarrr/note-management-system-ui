import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faHouse,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
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
    MDBNavbarBrand
} from 'mdb-react-ui-kit'

// const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { username, status, isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const [showNavColorSecond, setShowNavColorSecond] = useState(false);

    const onGoHomeClicked = () => navigate('/dash')
    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')

    // let dashClass = null
    // if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    //     dashClass = "dash-header__container--small"
    // }

    let goHomeButton = (
        <MDBNavbarItem>
            <MDBNavbarLink onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={faHouse} size='xl'/> {username} ({status})
            </MDBNavbarLink>
        </MDBNavbarItem>
    )

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <MDBNavbarItem>
                <MDBNavbarLink onClick={onNewNoteClicked}>
                    <FontAwesomeIcon icon={faFileCirclePlus} size='xl'/>
                </MDBNavbarLink>
            </MDBNavbarItem>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <MDBNavbarItem>
                <MDBNavbarLink onClick={onNewUserClicked}>
                    <FontAwesomeIcon icon={faUserPlus} size='xl'/>
                </MDBNavbarLink>
            </MDBNavbarItem>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <MDBNavbarItem>
                    <MDBNavbarLink onClick={onUsersClicked}>
                        <FontAwesomeIcon icon={faUserGear} size='xl'/>
                    </MDBNavbarLink>
                </MDBNavbarItem>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <MDBNavbarItem>
                <MDBNavbarLink onClick={onNotesClicked}>
                    <FontAwesomeIcon icon={faFilePen} size='xl'/>
                </MDBNavbarLink>
            </MDBNavbarItem>
        )
    }

    const logoutButton = (
        <MDBNavbarItem>
            <MDBNavbarLink onClick={sendLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} size='xl'/>
            </MDBNavbarLink>
        </MDBNavbarItem>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let navBarContent
    if (isLoading) {
        navBarContent = <PulseLoader size={50} color={"#FFF"} />
    } else {
        navBarContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <MDBNavbar expand='lg' dark bgColor='dark' fixed='top'>
                <MDBContainer fluid>
                    <MDBNavbarBrand>
                        <img
                        src='../img/logo.png'
                        height='30'
                        alt=''
                        loading='lazy'
                        className='rounded-circle'
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
                            {goHomeButton}
                        </MDBNavbarNav>
                        <MDBInputGroup tag="form" className='d-flex w-auto'>
                            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 text-center'>
                                {navBarContent}
                            </MDBNavbarNav>
                        </MDBInputGroup>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>

            <p className={errClass}>{error?.data?.message}</p>
        </>
    )

    return content
}
export default DashHeader