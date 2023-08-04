import {
    MDBContainer,
    MDBCard, 
    MDBCardBody, 
    MDBRow, 
    MDBCol,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section>

            

            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                    <MDBCard className='bg-light my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                            <p>{today}</p>
                            <h1>Welcome {username}!</h1>

                            <MDBListGroup style={{ minWidth: '22rem' }} light>
                                <MDBListGroupItem tag='a' color='secondary' href='/dash/notes' action className='px-3'>
                                    View Tasks
                                </MDBListGroupItem>
                                <MDBListGroupItem tag='a' color='secondary' href='/dash/notes/new' action className='px-3'>
                                    Create New Task
                                </MDBListGroupItem>
                                {(isManager || isAdmin) && <MDBListGroupItem tag='a' color='secondary' href='/dash/users' action className='px-3'>
                                    View Users
                                </MDBListGroupItem>}
                                {(isManager || isAdmin) && <MDBListGroupItem tag='a' color='secondary' href='/dash/users/new' action className='px-3'>
                                    Create New User
                                </MDBListGroupItem>}
                            </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </section>
    )

    return content
}
export default Welcome