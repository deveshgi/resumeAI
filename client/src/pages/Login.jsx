// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { CiUser } from "react-icons/ci";
// import { MdOutlineMail } from "react-icons/md";
// import { RiLock2Line } from "react-icons/ri";
// import api from "../configs/api";
// import { useDispatch } from "react-redux";
// import { login } from "../app/features/authSlice";
// import toast from "react-hot-toast";

// function Login() {
//   const dispatch = useDispatch()
//   const query = new URLSearchParams(window.location.search)
//   const urlState = query.get('state')
//   const [state, setState] = useState(urlState || "login");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   console.log(formData);

//   //   try {
//   //     const { data } = await api.post(`/auth/${state}`, formData)
//   //     dispatch(login({
//   //       token: data.token,
//   //       user: data.user
//   //     }));

//   //     localStorage.setItem('token', data.token);

//   //     toast.success(data.message)
//   //     navigate("/app");
//   //   } catch (error) {
//   //     toast.error(error?.response?.data?.message || error.message)
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await api.post(`/auth/${state}`, formData);

//       dispatch(login({
//         user: data.data.user 
//       }));

//       toast.success(data.message);
//       navigate("/app");

//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     if (urlState) {
//       setState(urlState);
//     }
//   }, [urlState]);

//   const navigate = useNavigate();
//   // const [searchParams] = useSearchParams();
//   // const urlState = searchParams.get("state");
//   // const [state, setState] = useState("login");

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black px-4">
//       <form onSubmit={handleSubmit}
//         className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl px-8 py-10 text-center"
//       >

//         {/* Heading */}
//         <h1 className="text-white text-3xl font-semibold">
//           {state === "login" ? "Login" : "Sign Up"}
//         </h1>
//         <p className="text-gray-400 text-sm mt-2">
//           Please {state} to continue
//         </p>

//         {/* register) */}
//         {state === "signup" && (
//           <div className="flex items-center mt-6 w-full border border-gray-700 h-12 rounded-full px-4 gap-2 focus-within:border-green-500">
//             <CiUser className="text-gray-400" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               className="bg-transparent outline-none text-white w-full"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         )}

//         {/* Email */}
//         <div className="flex items-center mt-4 w-full border border-gray-700 h-12 rounded-full px-4 gap-2 focus-within:border-green-500">
//           <MdOutlineMail className="text-gray-400" />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             className="bg-transparent outline-none text-white w-full"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="flex items-center mt-4 w-full border border-gray-700 h-12 rounded-full px-4 gap-2 focus-within:border-green-500">
//           <RiLock2Line className="text-gray-400" />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="bg-transparent outline-none text-white w-full"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Forgot password */}
//         {state === "login" && (
//           <div className="mt-3 text-right">
//             <button type="button" className="text-sm text-green-400 hover:underline">
//               Forgot Password?
//             </button>
//           </div>
//         )}

//         {/* Button */}
//         <button type="submit" className='bg-green-600 hover:bg-green-700 text-slate-50 rounded-full px-16 py-3 mt-6 h-11'>
//           {state === "login" ? "Login" : "Create Account"}
//         </button>

//         {/* Toggle */}
//         <p className="text-gray-400 text-sm mt-6">
//           {state === "login"
//             ? "Don't have an account?"
//             : "Already have an account?"}{" "}
//           <span
//             onClick={() => {
//               const newState = state === "login" ? "signup" : "login";
//               setState(newState);
//               navigate(`/?state=${newState}`);
//             }}
//             className="text-green-400 cursor-pointer hover:underline"
//           >
//             {state === "login" ? "Sign up" : "Login"}
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlState = searchParams.get("state");
  const [state, setState] = useState(urlState || "login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // ✅ payload fix (login vs signup)
    const payload =
      state === "login"
        ? {
            email: formData.email,
            password: formData.password,
          }
        : formData;

    // ✅ endpoint fix (backend ke according)
    const endpoint =
      state === "login" ? "login" : "register";

    const { data } = await api.post(`/auth/${endpoint}`, payload);

    // ✅ Redux update
    dispatch(login({
      user: data.data.user,
    }));

    // ✅ Toast message
    if (state === "signup") {
      toast.success("Account created & logged in 🎉");
    } else {
      toast.success("Login successful ✅");
    }

    // ✅ Redirect
    navigate("/app");

  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (urlState) {
      setState(urlState);
    }
  }, [urlState]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl px-8 py-10 text-center"
      >

        <h1 className="text-white text-3xl font-semibold">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Please {state} to continue
        </p>

        {/* Name */}
        {state === "signup" && (
          <div className="flex items-center mt-6 border border-gray-700 h-12 rounded-full px-4 gap-2">
            <CiUser className="text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="bg-transparent outline-none text-white w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center mt-4 border border-gray-700 h-12 rounded-full px-4 gap-2">
          <MdOutlineMail className="text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="bg-transparent outline-none text-white w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 border border-gray-700 h-12 rounded-full px-4 gap-2">
          <RiLock2Line className="text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-transparent outline-none text-white w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot */}
        {state === "login" && (
          <div className="mt-3 text-right">
            <button
              type="button"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Button */}
        <button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-16 py-3 mt-6 h-11 transition">
          {state === "login" ? "Login" : "Create Account"}
        </button>

        {/* Toggle */}
        <p className="text-gray-400 text-sm mt-6">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() => {
              const newState = state === "login" ? "signup" : "login";
              setState(newState);
              navigate(`/app?state=${newState}`); // ✅ FIXED
            }}
            className="text-green-400 cursor-pointer hover:underline"
          >
            {state === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;