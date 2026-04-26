// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { logout } from '../app/features/authSlice'

// function Navbar() {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const user = { name: 'john doe' }

//   const logoutUser = async () => {
//   await api.post("/auth/logout");
//   dispatch(logout());
//   navigate('/');
// }

//   return (
//     <div className="bg-black border-b border-gray-800">
//       <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">

//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <h1 className="text-xl font-bold text-white">
//             Resume
//             <span className="text-green-500">
//               Ai
//             </span>
//           </h1>
//         </Link>

//         {/* Right Section */}
//         <div className="flex items-center gap-4 text-sm">

//           {/* User */}
//           <p className="text-gray-300">
//             Hi, <span className="text-white font-medium">{user.name}</span>
//           </p>

//           {/* Logout */}
//           <button
//             onClick={logoutUser}
//             className="px-5 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition active:scale-95"
//           >
//             Logout
//           </button>

//         </div>
//       </nav>
//     </div>
//   )
// }

// export default Navbar


import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../app/features/authSlice'
import api from '../configs/api'

function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ✅ Get real user from Redux
  const { user } = useSelector(state => state.auth)

  // ✅ Logout function (backend + frontend)
  const logoutUser = async () => {
    try {
      await api.post('/auth/logout')

      dispatch(logout())
      navigate('/')

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="bg-black border-b border-gray-800">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">
            Resume
            <span className="text-green-500">Ai</span>
          </h1>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-sm">

          {/* ✅ Dynamic User Name */}
          <p className="text-gray-300">
            Hi, <span className="text-white font-medium">
              {user?.name || "User"}
            </span>
          </p>

          {/* Logout */}
          <button
            onClick={logoutUser}
            className="px-5 py-1.5 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition active:scale-95"
          >
            Logout
          </button>

        </div>
      </nav>
    </div>
  )
}

export default Navbar