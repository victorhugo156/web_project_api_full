import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export function ProtectedRoute(){

    const { isLoggedIn } = useContext(CurrentUserContext);

        if(!isLoggedIn){
            return <Navigate to="/signin"/>
        }

        return <Outlet/>

}