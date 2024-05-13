import { Route, Routes } from 'react-router-dom'
import LayoutClient from '@/client/LayoutClient'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutClient />}>

      </Route>
    </Routes>
  )
}
