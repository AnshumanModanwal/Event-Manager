// import {create} from 'zustand';

// const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
 
//   formData:{
//     title: '',
//     description: '',
//     startTime: '',
//     endTime: ''
//   },
//   events: [],
//   isUpdate: false,             
//   currentEvent: null,          
//   setIsUpdate: (status) => set({ isUpdate: status }),
//   setCurrentEvent: (event) => set({ currentEvent: event }),
  
//   login: (user, token) => set({ user, token }),
//   logout: () => set({ user: null, token: null }),
//   setFormData:(name,value)=>set((state)=>({
//     formData:{
//         ...state.formData,
//         [name]:value
//     }
//   })),
//   setEvents: (events) => set({ events }),
// }));

// export default useAuthStore;


import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      formData: { title: '', description: '', startTime: '', endTime: '' },
      events: [],
        isUpdate: false,             
        currentEvent: null,          
        setIsUpdate: (status) => set({ isUpdate: status }),
        setCurrentEvent: (event) => set({ currentEvent: event }),
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      setFormData: (name, value) => set((state) => ({
        formData: { ...state.formData, [name]: value },
      })),
      setEvents: (events) => set({ events }),
    }),
    {
      name: 'auth-storage', // unique name for storage in localStorage
      partialize: (state) => ({ user: state.user, token: state.token }), // only persist user and token
    }
  )
);

export default useAuthStore;
