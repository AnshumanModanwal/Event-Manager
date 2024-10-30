import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdUpdate }  from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import Form from './Form';
import useAuthStore from '../store/authStore';
import { apiConnector } from '../services/apiConnector';
import { REACT_APP_BASE_URL } from '../services/defaultUrl';
import DeleteForm from './DeleteForm';

const List = () => {
    const {user,formData,events,setEvents} = useAuthStore();
const [isClicked, setIsClicked ] = useState(false);

   
    useEffect(()=>{

       const fetchData = async () =>{
        try {

            const response = await apiConnector("POST",REACT_APP_BASE_URL+"/show-events",{user}

            )

            if(response){
                setEvents(response.data.events)
                // setDuplicateEvents(response.data.events)
            }else{
                console.log("Error while fetching events")
            }
            
            console.log(response.data.events)
        } catch (error) {
            console.log("error while fetching events ")
            console.log(error)
            
        }

       }
       if (user) {
        fetchData();
    }
    },[user, setEvents,formData])

const handleUpdate=()=>{
    setIsClicked(true);

}

    
  return (
    <div className='text-yellow-100    flex flex-col border-2 border-pure-greys-400 rounded-lg p-3 gap-10 md:!max-w-[50%] !items-center md:!justify-center'>
        <h1 className='md:text-4xl text-3xl  '>Scheduled Events</h1>
        <div className='flex justify-center items-center gap-3'>
        {/* <TfiWrite className=' text-5xl hover:scale-110 cursor-pointer'/> */}
        {/* <p>Click to schedule event</p> */}
        <Form dynamicButton={TfiWrite} size={"5"} />
</div>
        <div className='h-0.5 w-full bg-pure-greys-400'></div>

        {
        events?.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).map((event)=>(

            <div key={event._id} className='flex flex-col justify-center items-center border rounded-lg pt-10 p-4 relative z-2 min-w-full '>
                <div className='text-xl'>{event.title}</div>
                <div className='min-w-full'>
                    <p>{event.description}</p>
                </div>

                
                <div className='flex text-2xl gap-10 justify-end w-full'>
<div>
{    
 <DeleteForm eventId={event._id}/>}
        
</div>
        <Form DynamicButton={MdUpdate} size={"2"} event={event} onClick={handleUpdate} isClicked={isClicked} setIsClicked={setIsClicked} />
                    
                </div>

                <div className='flex absolute inset-0 w-[100%] h-8 z-0 justify-around bg-[#D1D1D1] rounded-t-lg text-black text-sm items-center'>
                    <p>{new Date(event.startTime).toLocaleDateString()}{" "}
                    {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>

                    {" - "}
                    <p> {new Date(event.endTime).toLocaleDateString()}{" "}
                    {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                </div>

        ))
        }
  
    </div>
  )
}

export default List