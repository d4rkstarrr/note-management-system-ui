import { useState } from 'react'
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
import { faIls } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Public = () => {

    const [showNavColorSecond, setShowNavColorSecond] = useState(false);

    const content = (
            <header>
                <MDBNavbar expand='lg' light bgColor='light'>
                    <MDBContainer fluid>
                        <MDBNavbarBrand>
                            <FontAwesomeIcon icon={faIls} size='xl'/>
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
                                    <MDBNavbarLink href='/login'>Login</MDBNavbarLink>
                                </MDBNavbarItem>
                            </MDBNavbarNav>
                            </MDBInputGroup>
                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>
            </header>
    )
    return content
}
export default Public