import { useGetNotesQuery } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import DataTable from "react-data-table-component"
import { useNavigate } from 'react-router-dom'
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const NotesList = () => {
    useTitle('Task List')

    const { username, isManager, isAdmin } = useAuth()

    const navigate = useNavigate()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader size={50} color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const columns = [
            {
                name: 'Title',
                selector: row => row.title,
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => row.status,
                sortable: true,
            },
            {
                name: 'Created On',
                selector: row => row.created,
                sortable: true,
            },
            {
                name: 'Last Updated On',
                selector: row => row.updated,
                sortable: true,
            },
            {
                name: 'Owner',
                selector: row => row.owner,
                sortable: true,
            },
            {
                name: 'Edit',
                selector: row => row.edit,
                sortable: false,
            },
        ]

        const data = filteredIds?.length && filteredIds.map(noteId => {
            const container = {}
            container['status'] = entities[noteId].completed ? "Completed" : "In Progress"
            container['created'] = new Date(entities[noteId].createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
            container['updated'] = new Date(entities[noteId].updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
            container['title'] = entities[noteId].title
            container['owner'] = entities[noteId].username

            const handleEdit = () => navigate(`/dash/notes/${noteId}`)
            container['edit'] = <div role="button" onClick={handleEdit}>
                                    <FontAwesomeIcon icon={faPenToSquare} size='xl'/>
                                </div>
            return container
        })
        
        content = 
            <MDBCard className="m-5 p-2">
                <MDBCardBody>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        defaultSortFieldId={2}
                        defaultSortAsc={false}
                        highlightOnHover={true}
                        paginationPerPage={15}
                        theme='light'
                    />
                </MDBCardBody>
            </MDBCard>
    }

    return content
}
export default NotesList