import { useGetUsersQuery } from "./usersApiSlice"
// import User from './User'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import DataTable from "react-data-table-component"
import { useNavigate } from 'react-router-dom'
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const UsersList = () => {
    useTitle('Users List')

    const navigate = useNavigate()

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader size={50} color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = users

        const columns = [
            {
                name: 'Username',
                selector: row => row.username,
                sortable: true,
            },
            {
                name: 'Roles',
                selector: row => row.roles,
                sortable: true,
            },
            {
                name: 'Edit',
                selector: row => row.edit,
                sortable: false,
            },
        ]

        const data = ids?.length && ids.map(userId => {
            const container = {}
            container['username'] = entities[userId].username
            container['roles'] = entities[userId].roles.join(", ")

            const handleEdit = () => navigate(`/dash/users/${userId}`)
            container['edit'] = <div role="button" onClick={handleEdit}>
                                    <FontAwesomeIcon icon={faPenToSquare} size='xl'/>
                                </div>
            return container
        })

        content = (
            <MDBCard className="m-5 p-2">
                <MDBCardBody>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        highlightOnHover={true}
                        paginationPerPage={15}
                        theme='light'
                    />
                </MDBCardBody>
            </MDBCard>
        )
    }

    return content
}
export default UsersList