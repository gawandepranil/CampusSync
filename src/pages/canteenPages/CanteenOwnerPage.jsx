import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getMenuItems,
  getOrders,
  updateOrderStatus,
} from "../../services/canteenService"; // Import Firebase functions

const CanteenOwnerPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pho = localStorage.getItem("canteen");
        if (!pho) {
          console.error("Phone number not found in localStorage");
          return;
        }
        setPhone(pho);

        const menu = await getMenuItems(pho);
        if (menu) {
          setMenuItems(Object.entries(menu).map(([name, price]) => ({ name, price })));
        }

        const orderData = await getOrders(pho);
        if (orderData) {
          setOrders(orderData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      if (!phone) {
        console.error("Phone number is not available");
        return;
      }
      await updateOrderStatus(phone, orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("canteen");
    window.location.href = "/canteen-login";
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
            <div className="flex space-x-4 text-xl">
              <Link to="#" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
          
              <Link to="/canteen-profile" className="text-gray-700 hover:text-blue-600">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-black-700 hover:text-red-600">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Canteen Owner Dashboard */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Canteen Owner Dashboard
        </h2>

        {/* Menu Management */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4">Menu Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="text-lg font-bold mb-2">{item.name}</h4>
                <p className="text-gray-600 mb-4">Price: ₹{item.price}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Edit Item
                </button>
              </div>
            ))}
          </div>
          <br />
          <br />
          <Link
            to={`/canteen/${phone}/add-menu-item`}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add New Menu Item
          </Link>
        </div>

        {/* Order Management */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4">Order Management</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-2">Order ID</th>
                  <th className="text-left py-2">Items</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-2">{order.id}</td>
                    <td className="py-2">{order.items}</td> {/* Directly using order.items */}
                    <td className={`py-2 ${order.status === "completed" ? "text-green-500" : "text-red-500"}`}>
                      {order.status}
                    </td>
                    <td className="py-2">
                      {order.status !== "completed" && (
                        <button
                          onClick={() => handleUpdateOrderStatus(order.id, "completed")}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Mark as Completed
                        </button>
                      )}
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

export default CanteenOwnerPage;
