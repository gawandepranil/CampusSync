import {  useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session // Should log null
    window.location.href = "/login"; // Redirect to login page
};

const navigate = useNavigate();
const handleEdit = async () => {
  navigate('/edit-profile')
}

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
            <img
                src="https://vierp-test.s3.ap-south-1.amazonaws.com/logo/vit_logo_new.png"
                alt="Team Charlie"
                className="h-14 w-14"
              />
            </div>
            <div className="flex space-x-4 text-xl ">
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="/canteen" className="text-gray-700 hover:text-blue-600">
                Canteen
              </a>
              <a href="/printing" className="text-gray-700 hover:text-blue-600">
                Printing
              </a>
              <a href="/profile" className="text-gray-700 hover:text-blue-600">
                Profile
              </a>
              <a onClick={handleLogout} href="/login" className="text-black-700 hover:text-red-600">
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Your Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="Profile"
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold">Dhiraj Jagtap</h3>
              <p className="text-gray-600">PRN: 22220027</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-gray-600">dhirajdj30@gmail.com</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <p className="mt-1 text-gray-600">+91 93568-28559</p>
            </div>
            <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;