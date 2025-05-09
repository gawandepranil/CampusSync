import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("user");
  const canteen = localStorage.getItem("canteen");
  const printer = localStorage.getItem("printing")
  if(user){
    return <Outlet /> 
  }
  else if(canteen){
    return <Outlet /> 

  }
  else if(printer){
    return <Outlet/>
  }
  else{
    return <Navigate to="/Index" />
  }
};

export default PrivateRoute;