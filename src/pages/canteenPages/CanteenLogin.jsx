import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/canteenService";



const CanteenLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();


  useEffect(() => {
    const user = localStorage.getItem("canteen");
    if (user) {
      navigate("/canteen-owner");
    }else{
      navigate("/canteen-login");
    }
  },[navigate])

  const handleLogin =async (e) => {
    setError(""); // Clear previous errors
    console.log(error)
    console.log(e)
    // Attempt to log in
    const isLoggedIn = await login(phone, password);
    if(isLoggedIn)
    {
      localStorage.setItem("canteen", JSON.stringify(phone));   
      navigate("/canteen-owner");
    }else{
      setError("Invalid Phone or Password");
    }
  };


  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
        <div className="bg-white px-10 py-2.5 rounded-lg shadow-lg  max-w-md">
          {/* College Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="https://vierp-test.s3.ap-south-1.amazonaws.com/logo/vit_logo_new.png"
              alt="College Logo"
              className="h-15"
            />
          </div>

          {/* Welcome Message */}
          <h1 className="text-xl font-bold text-center text-blue-800 mb-1">Canteen Owner Login</h1>
          <p className="text-center text-gray-600 mb-8">Please log in to access your account.</p>

          {/* Login Form */}
          <div >
            {/* PRN/Email Input */}
            <div className="mb-4">
              <label htmlFor="prn" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                id="prn"
                name="prn"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone no"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">Forgot Password?</a>
          </div>

          

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Dont have an account? <a href="#" className="text-blue-600 hover:text-blue-500">Sign Up</a></p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 flex items-center justify-center bg-yellow-500 opacity-70 ">
        <img
          src="https://gourmaha.ac.in/wp-content/uploads/2023/10/canteen.jpg"
          alt="College Banner"
          className="w-full  max-h-full  object-cover rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
};

export default CanteenLogin;