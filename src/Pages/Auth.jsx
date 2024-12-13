import React, { useEffect } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase';
import useAuthStore from '../store/authStore';
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import google from "../assets/google.png"

const GoogleLogin = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state)=>state.login)
    const auth = getAuth();

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        user.getIdToken().then(token => {
          login({ displayName: user.displayName, email: user.email, photoURL: user.photoURL }, token);
          console.log("user photo url",user.photoURL);
          console.log("User already logged in:", user);
        });
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth, login]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar.events'); // Request calendar permissions
  
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result._tokenResponse.oauthAccessToken;
      console.log(token);
      const user = result.user;
      // const token = await user.getIdToken();
  
      // Save the user's token and details
      login({ displayName: user.displayName, email: user.email, photoURL: user.photoURL, uid: user.uid }, token);
  
      // Navigate to the dashboard or wherever
      navigate('/dashboard');
      alert('Logged in with Google successfully');
  
      console.log("Google UID:", user.uid);
      console.log("OAuth Token:", token);
    } catch (error) {
      console.error("Error logging in with Google:", error);
      alert(error.message);
    }
  };
  


  // GitHub login function
// const loginWithGitHub = async () => {
//     const provider = new GithubAuthProvider();
    
//     try {
//         const result = await signInWithPopup(auth,provider);
        
//         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//         const credential = result.credential;
//         const token = credential.accessToken;
        
//         // The signed-in user info.
//         const user = result.user;

//         console.log('User Info:', user);
//         console.log('Access Token:', token);
//     } catch (error) {
//         console.error('Error during GitHub login:', error);
//         alert(error.message);
//     }
// };



  return (
   <div className='flex md:gap-32 gap-6 md:text-2xl text-lg '>

   <div className="group mx-auto  w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
 <div
        className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900"
        onClick={handleGoogleLogin}>
       <img src={google} className='w-[40px]'/>
       <button  className='text-white'>Login with Google</button>
      </div> 
   </div>
     
     {/**/}
{/* <div className='flex gap-2 justify-center items-center md:flex-row flex-col  hover:text-[#61251e]'>
<FaGithub className='text-white'/>
<button onClick={loginWithGitHub} >Login with GitHub</button>
</div> */}
   </div>
  );
};

export default GoogleLogin;
