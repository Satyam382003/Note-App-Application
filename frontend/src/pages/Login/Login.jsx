import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Signup from '../Signup/Signup'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstances from '../../utils/axiosInstances'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  

  if(!validateEmail(email)) {
    setError("Please Enter a Valid Email Address.");
    return;
  }

  if(!password){
    setError("please enter the password");
    return;
  }

  setError("");

  //Login API Call
  try{
    const response = await axiosInstances.post("/login",{
      email: email,
      password: password,
    });

    //Handle successfull login response
    if(response.data && response.data.accessToken){
      localStorage.setItem("token", response.data.accessToken)
      navigate('/dashboard')
         }
  } catch(error){
     //Handle login error
     if(error.response && error.response.data && error.response.data.message){
      setError(error.response.data.message);
     }else{
      setError("An unexpected error occurred.Please try again.");
     }
  }
};

  return (
    <>
    <Navbar/>

    <div className='flex items-center justify-center mt-30'>
        <div className='border rounded border-gray-300 w-96 px-7 py-10'>
            <form onSubmit={handleLogin}>
                <h4 className='text-2xl mb-7 text-center'>Login</h4>

                <input type='text'
                 placeholder='Email' 
                 className='input-box' 
                 value={email} 
                 onChange={(e) => setEmail(e.target.value)}
                 />

                  <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>

                  {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                <button type='submit' className='btn-primary'> Login </button>

                <p className='text-sm text-center mt-4'>Not registered yet?{" "}
                <Link to="/Signup" className='font-medium text-primary underline text-blue-600'>Create Account</Link>
                </p>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login
