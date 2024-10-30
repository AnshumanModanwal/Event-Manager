import React, { useState } from 'react'
import Modal from 'react-modal'
import { MdDelete, MdUpdate }  from "react-icons/md";
import { apiConnector } from '../services/apiConnector';
import { REACT_APP_BASE_URL } from '../services/defaultUrl';
import useAuthStore from '../store/authStore';
const DeleteForm = ({eventId}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  const {user,formData,events,setEvents} = useAuthStore();

  const handleDelete = async (event) => {
    console.log(eventId);
    event.preventDefault();
    try {
        const response = await apiConnector("POST",REACT_APP_BASE_URL+"/delete-event",{
            user,
            eventId
        })

        if( response.status==200 )

        {
            alert(response.message)
            console.log("Event deleted successfully");
            setEvents(events.filter(event => event._id!== eventId))
            
        }
        else{
            console.log("Error while deleting event")
        }
        
    } catch (error) {
        console.error("Error deleting event:", error);
        alert(error.message);
        
    }

    closeModal()
  }

  return (
    <div>
<MdDelete className='2xl text-[#D1D1D1] hover:scale-110 cursor-pointer hover:text-pink-500' onClick={openModal}/>
<Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Event"
        className="bg-[#D1D1D1] text-lg p-6 rounded-lg max-w-md mx-auto w-[95%] my-20 outline-none shadow-lg font-semibold text-[#000814] "
        overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
      >
      <div className="flex flex-col gap-3 justify-center items-center">
        <p>Are you sure you want to delete this event?</p>
        <div className="flex gap-3">
          <button className="text-[#bf1b0f] hover:bg-[#e66c63] hover:text-black px-4 py-2 rounded-md" onClick={handleDelete}>Yes</button>
          <button className="text-black hover:bg-[#70b55c] bg-gray-3" onClick={closeModal}>Cancel</button>
     </div>
     </div>
</Modal>
    </div>
  )
}

export default DeleteForm