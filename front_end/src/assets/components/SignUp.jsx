import React, { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "./Context";
import Input from "./Input";
import { Api } from "./Api";

const SignUpForm = () => {
  const {setOpenModal } = useUserContext();

  const [formData, setFormData] = useState({
    email: '',
    tel: '',
    password: '',
    cPassword: ''
  })
  const [message, setMessage] = useState('')
  const[loading, setLoading] = useState(false)

  // function that handles the the input
  const handleInput = (e)=>{
      setFormData(prevData => ({...prevData, [e.target.name] : e.target.value }))
  }

  const inputFields = [
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
    },
    {
      type: 'tel',
      name: 'tel',
      placeholder: 'Tel'
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'password'
    },
    {
      type: 'password',
      name: 'cPassword',
      placeholder: 'confirm password'
    }
  ];

  const handleVal = (data)=>{
    if(!data.email || !data.tel || !data.password || !data.cPassword){
      return 'please fill all fields';
    }
    if(data.cPassword !== data.password){
      return 'password mismatch'
    }
    return null;
  }

  const handleSignup = async (e)=>{
    e.preventDefault()

    const error = handleVal(formData);
   
    if(!error){
      setLoading(true)
    try {
      const responseData = await Api(formData, 'signup');
      setMessage(responseData.message)
      setOpenModal('login')
    } catch (error) {
      console.log('could not access the server')
    } finally{
      setLoading(false)
    }

    }else{
      console.log(error)
      return setMessage(error)
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-sm relative">
       
      <button
        onClick={() => setOpenModal(null)}
        className="absolute top-4 right-4 cursor-pointer hover:opacity-50"
      >
        <FaX />
      </button>

      <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
      <p className="text-gray-500 text-center mb-6 italic">
        create your account
      </p>
      <form className="space-y-4">
       {
        inputFields.map((inputField, index) => (
          <Input key={index} type={inputField.type} name={inputField.name} placeholder={inputField.placeholder} onChange={handleInput}/>
        ))
       }
        <button
          type="submit"
          className="w-full bg-black hover:bg-[#282828] cursor-pointer text-white font-bold py-2 rounded-full transition"
          onClick={handleSignup}
        >
          {loading? 'SIGN UP...' : 'SIGN UP'}
        </button>
      </form>
      <p className="text-center text-red-500 mt-3">{message}</p>


      <p className="text-center text-sm text-gray-400 mt-4">
        Already have an account?{" "}
        <span
          className="text-yellow-500 font-semibold cursor-pointer hover:underline"
          onClick={() => setOpenModal("login")}
        >
          Log In
        </span>
      </p>
    </div>
  );
};

export default SignUpForm;
