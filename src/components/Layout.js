import { Outlet } from 'react-router-dom'
import ParticleBackground from './ParticlesBackground'

const Layout = () => {
    return <>
        <ParticleBackground />
        <Outlet />
    </>
}
export default Layout