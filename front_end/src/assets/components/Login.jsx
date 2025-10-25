import React, { useState } from "react";
import { useUserContext } from "./Context";
import { FaX } from "react-icons/fa6";
import Input from "./Input";
import { Api } from "./Api";
import { ItemWithExpiry } from "./ItemWithExpiry";

const LoginForm = () => {
  const { user, setUser, setOpenModal } = useUserContext();

  const handleInput = (e)=>{
    const {name, type, checked, value} = e.target
    setFormData(prev => ({...prev, [name] : type === 'checkbox'? checked : value}))
  }

  const [message, setMessage] = useState('');

  const[formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: ''
  })

  const [loading, setLoading] = useState(false)

  const inputFields = [
      {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
    },
      {
      type: 'password',
      name: 'password',
      placeholder: 'Password',
    },
  ]

  const handleVerification = (data)=>{
    if(!data.email || !data.password){
      return 'please fill all input fields'
    }
    return null;
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
  const formError = handleVerification(formData);

  if(!formError){
    setLoading(true);
    try {
      console.log(formData)
     const response = await Api(formData, 'login');
      if(response.success){
        setMessage(response.message);
        setUser(prevUser => ({...prevUser, ...formData}));
        setOpenModal(null)
        ItemWithExpiry('Token', response.token, 24*60*60*1000)
      } else{
        setMessage(response.message)
      }
    }catch (error) {
      console.log(error);
      setMessage('could not access server')
    }finally{
      setLoading(false)
    }
  }else{
    setMessage(formError)
  }

  

  }

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-sm relative">
        <button
          onClick={() => setOpenModal(null)}
          className="absolute top-4 right-4 cursor-pointer hover:opacity-50"
        >
          <FaX />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>
        <p className="text-gray-500 text-center mb-6 italic">to your account</p>

        <form className="space-y-4">
        {inputFields.map((inputField, index)=>(
          <Input key={index} name={inputField.name} placeholder={inputField.placeholder} type={inputField.type} onChange={handleInput}/>
        ))}
        <input type="checkbox" name="rememberMe" id="rememberMe" onChange={handleInput} /> <label htmlFor="rememberMe">Remember me</label>
          <button
            type="submit"
            className="w-full bg-black hover:bg-[#3c3c3c] text-white font-bold py-2 rounded-full transition"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading? 'LOGGING IN...' : 'LOG IN'}
          </button>
        </form>
        <p className="text-center text-red-500 mt-3">{message}</p>

        <p className="text-center text-sm text-gray-400 mt-4 cursor-pointer hover:text-gray-600">
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
