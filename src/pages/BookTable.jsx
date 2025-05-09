import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCanteenOwnerByPhone, updateCanteenOwner } from "../services/canteenService";



const BookTable = () => {
  const { phone } = useParams();
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState("");
  const [headcount, setHeadcount] = useState(1);
  const [fixedAmountPerHead, setFixedAmountPerHead] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const own = await getCanteenOwnerByPhone(phone);
        setFixedAmountPerHead(20);
        setOwner(own);
        // setFixedAmountPerHead(own.fixed_amount_per_head || 0); // Assuming fixed_amount_per_head is provided by the owner
      } catch (error) {
        console.error("Error fetching owner details: ", error);
      }
      setLoading(false);
    };

    fetchOwnerDetails();
  }, [phone]);

  useEffect(() => {
    // Calculate total amount whenever headcount changes
    setTotalAmount(headcount * fixedAmountPerHead);
  }, [headcount, fixedAmountPerHead]);

  const handleHeadcountChange = (e) => {
    const count = parseInt(e.target.value);
    setHeadcount(count > 0 ? count : 1);
  };

  const handleSubmitBooking = () => {
    try {
      let tableBookings = [];
      const capacity = owner.capacity;
      const avilableBookings = owner.table_bookings ? capacity - owner.table_bookings.length : 0;
      
      if(headcount >  avilableBookings){
        alert("Max Booking Limit exceed!")
        return;
      }
  
      // Loop n times to add 'Booking' to the list
      for (let i = 0; i < headcount; i++) {
        tableBookings.push("Booking");
      }
  
      // Call the updateCanteenOwner function with the new tableBookings list
      updateCanteenOwner(phone, { table_bookings: tableBookings }).then(
        alert("Booking Successful!")
      )
    } catch (error) { // Fix: Remove extra parentheses
      console.error("Error submitting booking: ", error);
      alert("Failed to book the table. Please try again.");
    }
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
          🪑 Book a Table
        </h1>

        {/* Headcount Input */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center">
            <span className="mr-2">👥</span> Number of People
          </h2>
          <input
            type="number"
            min="1"
            value={headcount}
            onChange={handleHeadcountChange}
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Fixed Amount Per Head */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center">
            <span className="mr-2">💰</span> Fixed Amount Per Head
          </h2>
          <p className="text-pink-800 font-bold text-xl">₹{fixedAmountPerHead}</p>
        </div>

        {/* Total Amount */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold text-red-700 mb-4 flex items-center">
            <span className="mr-2">💵</span> Total Amount
          </h2>
          <p className="text-red-800 font-bold text-xl">₹{totalAmount}</p>
        </div>

        {/* Submit Booking Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmitBooking}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Book Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTable;