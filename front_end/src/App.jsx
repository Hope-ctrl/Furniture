import { useState } from 'react'
import fontOne from '../src/assets/fonts/Beckan-Personal.otf'
import './App.css'
import Landing from './assets/components/Home/Landing'
import Home from './assets/pages/Home'
import LoginForm from './assets/components/Login'
import SignupForm from './assets/components/SignUp'
import Dashboard from './assets/pages/Dashboard'

function App() {

  return (
    <>
      {/* <Home/> */}
      <Dashboard/>
    </>
  )
}

export default App
