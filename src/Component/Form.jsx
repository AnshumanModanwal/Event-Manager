import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { TfiWrite } from 'react-icons/tfi'
import useAuthStore from '../store/authStore'
import { apiConnector } from '../services/apiConnector'

import { REACT_APP_BASE_URL } from '../services/defaultUrl'


const BASE_URL = REACT_APP_BASE_URL
const Form = ({DynamicButton=TfiWrite, size,event}) => {


  console.log(event,"event coming frm list")


  const [modalIsOpen, setModalIsOpen] = useState(false)

  const formatDateToLocal = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format to 'YYYY-MM-DDTHH:mm'
  }

 const {formData,setFormData,user,token,isUpdate, currentEvent, setIsUpdate,setCurrentEvent} = useAuthStore()

//  console.log("event id", currentEvent)
  const handleOnChange =(event)=>{
    const {name,value} = event.target;
    setFormData(name,value)

  }

  const handleCancel=(e)=>{
    e.preventDefault();
    setCurrentEvent(null)
    setFormData("title", "");
    setFormData("description", "");
    setFormData("startTime", "");
    setFormData("endTime", "");
 

    closeModal();

  }
  
// Populate formData when `event` is provided
useEffect(() => {
  if (isUpdate && currentEvent) {
    setFormData("title", currentEvent.title || "")
    setFormData("description", currentEvent.description || "")
    setFormData("startTime", formatDateToLocal(currentEvent.startTime) || "")
      setFormData("endTime", formatDateToLocal(currentEvent.endTime) || "")
  }
  else{
    setFormData("title", "");
  setFormData("description", "");
  setFormData("startTime", "");
  setFormData("endTime", "");
  }
}, [isUpdate, currentEvent ])


  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("before API call");

   if(currentEvent){
    try {
      const response = await apiConnector("PUT",REACT_APP_BASE_URL+"/update-event",{
        eventId: currentEvent._id,
        user,
        formData
      })
     console.log(response, "response from backend")
     setCurrentEvent(null)
      if(response.status==200){
        setFormData({
          "title":response.updatedEvent.title,
          "description":response.updatedEvent.description,
          "startTime":response.updatedEvent.startTime,
          "endTime":response.updatedEvent.endTime,
        })
        
      }
      else{
        alert("Failed to update event")
      }
      
    } catch (error) {
      alert(error)
    }
    setIsUpdate(false)
    closeModal();
   }
   else{

    try {
      const response = await apiConnector("POST", BASE_URL + "/schedule-event", {
          user,
          formData,
          headers: { 'Content-Type': 'application/json' },
          accessToken:token
          
      });

      if (response.status === 201) { // Check for successful creation
          // Assuming the response contains the created event
          alert("Event Added");
         
          // Close the modal and reset form data
          closeModal();
          setFormData("title", ""); // Reset title
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
    
  setFormData("title", "");
  setFormData("description", "");
  setFormData("startTime", "");
  setFormData("endTime", "");

    closeModal();
   }
};

  return (
    <div className="flex justify-center items-center gap-3">
      <DynamicButton className={`text-${size}xl hover:scale-110 cursor-pointer text-[#D1D1D1]`} onClick={openModal} />

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
            Event title
            <input type="text" className="border p-2 w-full rounded-md" placeholder="Enter event title" onChange={handleOnChange} name='title' value={formData.title}/>
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
             {currentEvent?"Update": "Save"}
            </button>
            <button type="button" onClick={handleCancel} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400" >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Form
