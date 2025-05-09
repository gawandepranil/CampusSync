import { useState, useEffect } from "react";
import { addPrintDoc, getPrinterOwner } from "../services/printService";
import { useParams } from "react-router-dom";

const PrintForm = () => {
  const { phone } = useParams();
  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(null);
  // Set user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    const fetchOwner = async () =>  {

        const own = await getPrinterOwner(phone);

        setOwner(own.name)
    }
    fetchOwner()
  }, [phone]);

  const [formData, setFormData] = useState({
    document: null,
    copies: 1,
    colorType: "bw", // Default to black & white
    pageType: "single", // Default to single page
    description: "",
  });

  const [totalCost, setTotalCost] = useState(0);

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    calculateCost({ ...formData, [name]: value });
  };

  // Calculate the total cost
  const calculateCost = (data) => {
    const { copies, colorType, pageType } = data;
    const pageCost = colorType === "color" ? 10 : 2; // Cost per page
    const totalPages = pageType === "single" ? 1 : 2; // Single or double-sided
    const cost = copies * pageCost * totalPages;
    setTotalCost(cost);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the function from printService.js
      await addPrintDoc(
        phone,
        user,
        "formData.document",
        formData.copies,
        formData.colorType,
        formData.pageType,
        formData.description,
        totalCost,
        "pending"
      );
      alert("Print request submitted successfully!");
      // Reset the form after submission
      setFormData({
        document: null,
        copies: 1,
        colorType: "bw",
        pageType: "single",
        description: "",
      });
      setTotalCost(0);
    } catch (error) {
      console.error("Error submitting print request:", error);
      alert("Failed to submit print request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          🖨️ {owner}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Document Upload */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Upload Document
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Number of Copies */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Number of Copies
            </label>
            <input
              type="number"
              name="copies"
              value={formData.copies}
              onChange={handleInputChange}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Color Type */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Color Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="colorType"
                  value="bw"
                  checked={formData.colorType === "bw"}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Black & White (₹2/page)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="colorType"
                  value="color"
                  checked={formData.colorType === "color"}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Colored (₹10/page)</span>
              </label>
            </div>
          </div>

          {/* Page Type */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Page Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pageType"
                  value="single"
                  checked={formData.pageType === "single"}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Single Page</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pageType"
                  value="backside"
                  checked={formData.pageType === "backside"}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">Double-Sided</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
              placeholder="Any special instructions or adjustments..."
            ></textarea>
          </div>

          {/* Total Cost */}
          <div className="text-xl font-semibold text-purple-700">
            Total Cost: ₹{totalCost}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
          >
            Submit Print Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrintForm;