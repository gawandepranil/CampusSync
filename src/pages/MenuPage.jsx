import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDailyMenuForOwner, getSpecialMenuForOwner } from "../services/menuService";
import { getMenuItems, getCanteenOwnerByPhone } from "../services/canteenService";
import { addOrder } from "../services/orderService";


const MenuPage = () => {
  const { phone } = useParams();
  const [dailyMenu, setDailyMenu] = useState({});
  const [specialMenu, setSpecialMenu] = useState({});
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const daily = await getDailyMenuForOwner('2025-01-30', phone);
        const special = await getSpecialMenuForOwner('2025-01-30', phone);
        const fixed = await getMenuItems(phone);
        const own = await getCanteenOwnerByPhone(phone);
        setOwner(own);
        setDailyMenu(daily.menu || {});
        setSpecialMenu(special.menu || {});
        setMenuItems(fixed || {});
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
      } catch (error) {
        console.error("Error fetching menus: ", error);
      }
      setLoading(false);
    };

    fetchMenu();
  }, [phone]);

  const handleQuantityChange = (item, quantity) => {
    const newOrderDetails = [...orderDetails];
    const itemIndex = newOrderDetails.findIndex(order => order.item === item);

    if (itemIndex !== -1) {
      if (quantity > 0) {
        newOrderDetails[itemIndex].quantity = quantity;
      } else {
        newOrderDetails.splice(itemIndex, 1);
      }
    } else if (quantity > 0) {
      newOrderDetails.push({ item, quantity });
    }

    setOrderDetails(newOrderDetails);
  };

  const handleSubmitOrder = () => {
      addOrder(phone, user, orderDetails);
      alert("Your order has been placed successfully.");

    // Here you can add the logic to submit the order to your backend
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <p className="text-white text-2xl font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8 animate-bounce">
          {owner.canteen_name}
        </h1>
        <h1 className="text-4xl font-bold text-center text-white mb-8 animate-bounce">
          🍽️ Todays Menu
        </h1>

        {/* Daily Menu */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center">
            <span className="mr-2">🌞</span> Daily Menu
          </h2>
          <ul className="space-y-2">
            {Object.keys(dailyMenu).length > 0 ? (
              Object.entries(dailyMenu).map(([item, price], index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <span className="text-purple-600 font-medium">{item}</span>
                  <span className="text-purple-800 font-bold">₹{price}</span>
                  <input
                    type="number"
                    min="0"
                    className="w-16 p-1 border border-purple-300 rounded"
                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                  />
                </li>
              ))
            ) : (
              <p className="text-purple-500">No items available.</p>
            )}
          </ul>
        </div>

        {/* Special Menu */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center">
            <span className="mr-2">🌟</span> Special Menu
          </h2>
          <ul className="space-y-2">
            {Object.keys(specialMenu).length > 0 ? (
              Object.entries(specialMenu).map(([item, price], index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <span className="text-pink-600 font-medium">{item}</span>
                  <span className="text-pink-800 font-bold">₹{price}</span>
                  <input
                    type="number"
                    min="0"
                    className="w-16 p-1 border border-pink-300 rounded"
                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                  />
                </li>
              ))
            ) : (
              <p className="text-pink-500">No items available.</p>
            )}
          </ul>
        </div>

        {/* Fixed Menu */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-red-700 mb-4 flex items-center">
            <span className="mr-2">🍴</span> Fixed Menu
          </h2>
          <ul className="space-y-2">
            {Object.keys(menuItems).length > 0 ? (
              Object.entries(menuItems).map(([item, price], index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <span className="text-red-600 font-medium">{item}</span>
                  <span className="text-red-800 font-bold">₹{price}</span>
                  <input
                    type="number"
                    min="0"
                    className="w-16 p-1 border border-red-300 rounded"
                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                  />
                </li>
              ))
            ) : (
              <p className="text-red-500">No items available.</p>
            )}
          </ul>
        </div>

        {/* Submit Order Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmitOrder}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;