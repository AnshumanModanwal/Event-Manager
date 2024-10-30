import React from 'react'
import useAuthStore from '../store/authStore'
import { FaRegHandPeace } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { auth } from '../firebase';
const Navigation = () => {
    const {user,logout} = useAuthStore()
    // console.log(user.photoURL)

    const navigate = useNavigate(); // Initialize navigate

    const handleLogout = async () => {
        try {
            await signOut(auth); // Call Firebase signOut method
            logout(); // Clear user state in Zustand store
            navigate('/'); // Redirect to the login page or home page
            alert('Logged out successfully');
        } catch (error) {
            console.error("Error logging out:", error);
            alert('Failed to log out: ' + error.message);
        }
    };
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}>
<div className="flex w-11/12 max-w-maxContent items-center justify-between gap-10">

   <div className='flex md:gap-10 gap-2 items-center'>
   <p className='text-sm md:text-xl'>Hi  {!user?"Guest":user.displayName} </p>
   <p className='text-xl'><FaRegHandPeace/></p>
   </div>
    <div className='flex gap-2 md:gap-10 items-center'>
    {user ? (
        <>
            
            {user.photoURL && (
                <img src={user.photoURL} alt="User Profile" width="40" className="rounded-full" loading='lazy'/>
            )}
            <p className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] hover:scale-110 cursor-pointer' onClick={handleLogout}>Logout</p>
        </>
    ) : (
        <p>Please Log In !</p> 
            )}
    </div>
</div>
    </div>
  )
}

export default Navigation