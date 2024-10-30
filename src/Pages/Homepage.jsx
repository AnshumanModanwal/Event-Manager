import React from 'react'
import GoogleLogin from './Auth'
import loginPage from "../assets/loginPage.jpg"
import Navigation from '../Component/Navigation'
import Footer from '../Component/Footer'
const Homepage = () => {
  return (
    

    <div>
    <Navigation/>
      <div className='flex flex-col justify-center items-center w- gap-10  p-9'>
    
    <div className='text-center 
    text-xl md:text-3xl font-bold  text-white'>
    <h1>Welcome to <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Event Manager</span> !</h1>
 
    <p>To access the events, login with your <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Google Account.</span></p>

    </div>

    <GoogleLogin/>
    <div className='rounded-xl'>
<img src={loginPage} width="400px" className='rounded-full ' alt="Login Page" />
</div>


</div>
<Footer/>
    </div>
  )
}

export default Homepage