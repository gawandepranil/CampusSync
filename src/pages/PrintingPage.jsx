import  { useState, useEffect } from "react";
import { getAllPrinterOwners, getPrintDocsForStudents } from "../services/printService";
import { Link } from "react-router-dom";

const PrintingPage = () => {
  const [history, setHistory] = useState([]);
  const [printer, setPrinter] = useState([]);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const printers = await getAllPrinterOwners();
        if(!printers){
          setPrinter([
            "No Data"
          ])
        }
        else{

          setPrinter(printers);
        }
      } catch (error) {
        console.error("Error fetching printers:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const printHistory = await getPrintDocsForStudents(userData);
        if(!printHistory){
          setHistory([
            "No Data"
          ])
        }
        else{

          setHistory(printHistory);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchPrinters();
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session // Should log null
    window.location.href = "/login"; // Redirect to login page
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
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
              <a onClick={handleLogout} href="/login" className="text-gray-700 hover:text-red-600 hover:cursor-crosshair">
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Printing Services */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Printing Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {printer.map((printee) => (
            <div
              key={printee.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl  transform hover:-translate-y-2 transition-transform"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{printee.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Distance: {printee.location}
              </p>
              <div className="flex space-x-4">
                <Link
                  to={`/print/${printee.phone}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Print Document
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Print Job History */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Print Job History
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700">Document</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-gray-700">{job.date}</td>
                    <td className="py-3 px-4 text-gray-700">{job.document}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          job.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : job.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.status}
                      </span>
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

export default PrintingPage;