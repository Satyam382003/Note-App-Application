import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstances from '../../utils/axiosInstances';

const Signup = () => {

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const handleSignup = async (e) =>{
    e.preventDefault();

    if(!name) {
      setError('please enter your name');
      return;
    }

    if(!validateEmail(email)){
      setError('please enter a valid email address');
      return;
    }

    if(!password){
    setError('please enter the password');
    return;
   }


    setError('');

    //Signup API Call
    try{
    const response = await axiosInstances.post("/create-account",{
      fullName: name,
      email: email,
      password: password,
    });

    //Handle successfull registration response
    if(response.data && response.data.error){
        setError(response.data.message);
        return 
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard');
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
            <form onSubmit={handleSignup }>
                <h4 className='text-2xl mb-7 text-center'>SignUp</h4>

                <input type='text'
                 placeholder='name' 
                 className='input-box' 
                 value={name} 
                 onChange={(e) => setName(e.target.value)}
                 />

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

                <button type='submit' className='btn-primary'> Create Account </button>

                <p className='text-sm text-center mt-4'>Already have an account?{" "}
                <Link to="/Login" className='font-medium text-primary underline text-blue-600'>Login</Link>
                </p>

              </form>
        </div>
    </div>
    </>
  )
}

export default Signup;
