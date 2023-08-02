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

const Public = () => {

    const [showNavColorSecond, setShowNavColorSecond] = useState(false);

    const content = (
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