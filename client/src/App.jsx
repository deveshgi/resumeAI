// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Layout from './pages/Layout'
// import Dashboard from './pages/Dashboard'
// import ResumeBuilder from './pages/ResumeBuilder'
// import Login from './pages/Login'
// import Preview from './pages/Preview'
// import { useDispatch } from 'react-redux'
// import { login, setLoading } from './app/features/authSlice'
// import { useEffect } from 'react'
// import api from './configs/api'
// import { Toaster } from 'react-hot-toast'

// function App() {

//   const dispatch = useDispatch()

//   // const getUserData = async () => {
//   //   const token = localStorage.getItem('token')

//   //   try {
//   //     if (token) {
//   //       const { data } = await api.get('/api/users/data', { headers: { Authorization: `Bearer ${token}` } })
//   //       if (data.user) {
//   //         dispatch(login({
//   //           token: data.token,
//   //           user: data.user
//   //         }))
//   //       }
//   //       dispatch(setLoading(false))
//   //     } else {
//   //       dispatch(setLoading(false))
//   //     }
//   //   } catch (error) {
//   //     dispatch(setLoading(false))
//   //     console.log(error.message);
//   //   }
//   // }
//   const getUserData = async () => {
//     try {
//       const { data } = await api.get(`/user/${"me"}`) // optional

//       dispatch(login({
//         user: data.data.user
//       }));

//     } catch (error) {
//       dispatch(setLoading(false))
//     } finally {
//       dispatch(setLoading(false))
//     }
//   }

//   useEffect(() => {
//     getUserData()
//   }, [])

//   return (
//     <>
//       <Toaster />
//       <Routes>
//         <Route
//           path="/"
//           element={<Home />}
//         />

//         <Route
//           path='app'
//           element={<Layout />}
//         >
//           <Route
//             index
//             element={<Dashboard />}
//           />
//           <Route
//             path='builder/:resumeId' element={<ResumeBuilder />}
//           />
//         </Route>

//         <Route
//           path='view/:resumeId'
//           element={<Preview />}
//         />

//       </Routes >
//     </>
//   )
// }

// export default App



import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import { useDispatch } from 'react-redux'
import { login, setLoading } from './app/features/authSlice'
import api from './configs/api'
import { Toaster } from 'react-hot-toast'

function App() {

  const dispatch = useDispatch()

  // ✅ Fetch logged-in user (cookie-based auth)
  const getUserData = async () => {
    try {
      const { data } = await api.get('/user/me')

      dispatch(login({
        user: data.data.user
      }))

    } catch (error) {
      // user not logged in → ignore
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      {/* Toast notifications */}
      <Toaster position="top-right" />

      {/* Routes */}
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Protected */}
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        {/* Public resume view */}
        <Route path="view/:resumeId" element={<Preview />} />

      </Routes>
    </>
  )
}

export default App