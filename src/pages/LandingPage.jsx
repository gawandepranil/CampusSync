import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session // Should log null
    window.location.href = "/login"; // Redirect to login page
};
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Campus Services</h1>
          <p className="text-lg mb-8">
            Order food, print documents, and manage your campus life with ease.
          </p>
          <div className="flex justify-center space-x-4">
            <button onClick={() => navigate("/canteen")} className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100">
              Order Food
            </button>
            <button onClick={() => navigate("/printing")} className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100">
              Print Documents
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Canteen Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-4">Canteen</h3>
            <p className="text-gray-600 mb-4">
              Order food from your favorite canteens on campus.
            </p>
            <button onClick={() => navigate("/canteen")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Order Now
            </button>
          </div>

          {/* Printing Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-4">Printing</h3>
            <p className="text-gray-600 mb-4">
              Print documents quickly and easily.
            </p>
            <button onClick={() => navigate("/printing")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Print Now
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold mb-4">Profile</h3>
            <p className="text-gray-600 mb-4">
              Manage your personal details and activity.
            </p>
            <button onClick={() => navigate("/profile")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
