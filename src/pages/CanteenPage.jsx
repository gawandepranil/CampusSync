import  { useState, useEffect } from "react";
import {  collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../services/firebaseConfig"; 
import { getOrdersForStudents } from "../services/orderService";
const CanteenPage = () => {
  const [orders, setOrders] = useState([]);
  const [canteens, setCanteens] = useState([]);

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "CanteenOwner"));
        const canteenData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCanteens(canteenData);
      } catch (error) {
        console.error("Error fetching canteens:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setOrders(await getOrdersForStudents(userData));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchCanteens();
    fetchOrders();
  }, []);
  
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
              <a onClick={handleLogout} href="/login"  className="text-black-700 hover:text-red-600">
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Canteen List */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Canteens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Canteen Card */}

          {canteens.map((canteen) =>(

            <div key={canteen.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold mb-4">{canteen.canteen_name}</h3>
                <h3 className="text-xl font-bold mb-4 text-amber-400"> {canteen.ratings}🌟</h3>
              </div>
              <p className="text-gray-600 mb-4">
                  Distance: {canteen.location} | 
                  Rush: {(() => {
                    const capacity = canteen.capacity;
                    const bookings = canteen.table_bookings ? canteen.table_bookings.length : 0;
                    const occupancy = (bookings / capacity) * 100;

                    if (occupancy > 80) return "High";
                    if (occupancy > 50) return "Moderate";
                    return "Quiet";
                  })()}
                </p>
                <div className="flex space-x-4">
                  <Link to={`/menu/${canteen.phone}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    View Menu
                  </Link>
                  <Link to={`/book/${canteen.phone}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Book Table
                  </Link>
                </div>
            </div>
          ))}



        </div>

        {/* Order History */}
        <div className="mt-12">
      <h2 className="text-2xl font-bold text-center mb-8">Order History</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Items</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2">{order.date}</td>
                <td className="py-2">{order.items}</td>
                <td className={`py-2 ${order.status === "completed" ? "text-green-500" : "text-red-500"}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        
      </div>
    </div>
  );
};

export default CanteenPage;