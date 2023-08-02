import { Outlet } from 'react-router-dom'
import ParticleBackground from './ParticlesBackground'

const Layout = () => {
    return <>
        <ParticleBackground />
        <div>
            <Outlet />
        </div>
    </>
}
export default Layout