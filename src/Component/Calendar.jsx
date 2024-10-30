import React from 'react'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import useAuthStore from '../store/authStore';
const MyCalendar = () => {
  const { events } = useAuthStore();
  console.log(events)
  // Map events from authStore to a date-based object
  const eventsByDate = events.reduce((acc, event) => {
    const startDate = new Date(event.startTime);
    // Convert start date to a string in the format 'yyyy-mm-dd' without time zone offset
    const dateStr = startDate.toLocaleDateString();

    console.log("printing date", dateStr)
    acc[dateStr] = event.title; // Store the description or any other data you want to display
    return acc;
  }, {});
    
      const tileContent = ({ date, view }) => {
       
        const dateStr = date.toLocaleDateString();
        
        return view === 'month' && eventsByDate[dateStr] ? (
          <p className='bg-pure-greys-400 rounded-lg text-white '>{eventsByDate[dateStr]}</p>
        ) : null;
      };
    
      return <Calendar tileContent={tileContent} className="md:!w-[500px] md:!h-[500px] md:max-w-[50%]  !bg-gradient-to-r from-[#D1D1D1] via-red-500 to-gray text-xl"/>;
}

export default MyCalendar
