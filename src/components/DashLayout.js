import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div className='content'>
                <Outlet />
            </div>
        </>
    )
}
export default DashLayout