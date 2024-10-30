import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore"


const PrivateRoute = ({element})=>{
   
    const { token } = useAuthStore();
    
    // Only navigate if token is null (will retain if token exists in localStorage)
    return token ? element : <Navigate to="/" />;
   
}

export default PrivateRoute;