import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'

type Props = {}

const LayoutClient = (props: Props) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default LayoutClient
