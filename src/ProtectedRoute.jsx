import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      console.log("This is token : ", token);
      navigate("/login");
      toast.error("You need to login first");
    }
  }, [token, navigate])

  return children;
}

export default ProtectedRoute

