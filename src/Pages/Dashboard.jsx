import React from 'react';


import MyCalendar from '../Component/Calendar';
import List from '../Component/List';
import Navigation from '../Component/Navigation';
import Footer from '../Component/Footer';

const Dashboard = () => {
  

  return (
    <>
    <Navigation/>
      <div className='flex  md:flex-row flex-col justify-center md:items-start items-center gap-3 md:gap-20  p-9 mt-5 text-black '>
     <MyCalendar />
       <List/>
    </div>
    <Footer/>
    </>
  )
};

export default Dashboard;
