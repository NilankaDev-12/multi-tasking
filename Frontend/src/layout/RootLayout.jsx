import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default RootLayout