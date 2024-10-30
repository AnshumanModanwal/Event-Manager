import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { TfiWrite } from 'react-icons/tfi'
import useAuthStore from '../store/authStore'
import { apiConnector } from '../services/apiConnector'

import { REACT_APP_BASE_URL } from '../services/defaultUrl'

// import {endpoints} from "../services/api"


// console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);

// const {
//     CREATE_EVENT
// } = endpoints

const BASE_URL = REACT_APP_BASE_URL
const Form = ({DynamicButton=TfiWrite, size,event, isClicked, setIsClicked}) => {

  console.log(isClicked)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const formatDateToLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format to 'YYYY-MM-DDTHH:mm'
  }

 const {formData,setFormData,user,token} = useAuthStore()

  const handleOnChange =(event)=>{
    const {name,value} = event.target;
    setFormData(name,value)

  }
  
// Populate formData when `event` is provided
useEffect(() => {
  if (isClicked) {
    setFormData("topic", event.title || "")
    setFormData("description", event.description || "")
    setFormData("startTime", formatDateToLocal(event.startTime) || "")
      setFormData("endTime", formatDateToLocal(event.endTime) || "")
  }
}, [setFormData])

console.log(event)

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("before API call");

   if(isClicked){
    try {
      const response = await apiConnector("POST",REACT_APP_BASE_URL+"/update-event",{
        eventId: event._id
      })
      
    } catch (error) {
      
    }
   setIsClicked(false)
    closeModal();
   }
   else{

    try {
      const response = await apiConnector("POST", BASE_URL + "/schedule-event", {
          user,
          formData,
      });

      if (response.status === 201) { // Check for successful creation
          // Assuming the response contains the created event
          alert("Event Added");
         
          // Close the modal and reset form data
          closeModal();
          setFormData("topic", ""); // Reset topic
          setFormData("description", ""); // Reset description
          setFormData("startTime", ""); // Reset start time
          setFormData("endTime", ""); // Reset end time
      } else {
          console.log("Error adding event", response);
      }

      console.log(response);
  } catch (error) {
      console.log("Error while submitting form");
      console.error(error);
  }
    
    

    closeModal();
   }
};

  return (
    <div className="flex justify-center items-center gap-3">
      <DynamicButton className={`text-${size}xl hover:scale-110 cursor-pointer text-[#D1D1D1]`}onClick={openModal} />

      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Schedule Event"
        className="bg-[#D1D1D1] p-6 rounded-lg max-w-md mx-auto w-[95%] my-20 outline-none shadow-lg text-[#000814]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
      >
        <h2 className="text-2xl mb-4">Schedule Event</h2>
        <form className="flex flex-col gap-3" onSubmit={submitHandler}>
          <label>
            Event Topic
            <input type="text" className="border p-2 w-full rounded-md" placeholder="Enter event topic" onChange={handleOnChange} name='topic' value={formData.topic}/>
          </label>
          <label>
            Description
            <textarea className="border p-2 w-full rounded-md" placeholder="Enter event description" onChange={handleOnChange} name='description' value={formData.description}/>
          </label>
          <label>
            Start Time
            <input type="datetime-local" className="border p-2 w-full rounded-md" onChange={handleOnChange} name='startTime' value={formData.startTime}/>
          </label>
          <label>
            End Time
            <input type="datetime-local" className="border p-2 w-full rounded-md" onChange={handleOnChange} name='endTime' value={formData.endTime}/>
          </label>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" >
             {isClicked?"Update": "Save"}
            </button>
            <button type="button" onClick={closeModal} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Form
