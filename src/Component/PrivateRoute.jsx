import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore"


const PrivateRoute = ({element})=>{
   
    const {token} = useAuthStore();

    return token ? element: <Navigate to="/"/>
}

export default PrivateRoute;