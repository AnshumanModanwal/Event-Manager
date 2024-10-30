import {create} from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  formData:{
    topic: '',
    description: '',
    startTime: '',
    endTime: ''
  },
  events: [],
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
  setFormData:(name,value)=>set((state)=>({
    formData:{
        ...state.formData,
        [name]:value
    }
  })),
  setEvents: (events) => set({ events }),
}));

export default useAuthStore;