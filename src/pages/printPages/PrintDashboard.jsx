import { useState, useEffect } from "react";
import { updatePrintDocStatus, getPrintDocs } from "../../services/printService"; // Import Firebase functions

const PrintDashboard = () => {
  const [printJobs, setPrintJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // Track the selected job for the popup
  const [phone, setPhone] = useState(null); // Get the printing service provider's phone number from localStorage // Get the printing service provider's phone number from localStorage

  // Fetch print jobs when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get phone number from localStorage
        const pho = localStorage.getItem("printing");
        if (!pho) {
          console.error("Phone number not found in localStorage");
          return;
        }
        setPhone(pho);
        // Fetch print jobs
        const jobs = await getPrintDocs(pho);
        console.log(jobs);
        setPrintJobs(jobs);
      } catch (error) {
        console.error("Error fetching print jobs:", error);
      }
    };

    fetchData();
  }, []); // Remove phone from dependency array

  // Handle printing a job
  const handlePrintJob = (job) => {
    setSelectedJob(job); // Open the confirmation popup
  };

  // Handle confirming the print job
  const handleConfirmPrint = async () => {
    try {
      if (!phone || !selectedJob) {
        console.error("Phone number or selected job is not available");
        return;
      }

      // Update the job status to "completed"
      await updatePrintDocStatus(phone, selectedJob.student_id, selectedJob.uniqueId, "completed");

      // Remove the completed job from the list
      setPrintJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== selectedJob.id)
      );

      // Close the popup
      setSelectedJob(null);
      console.log(`Print job ${selectedJob.id} marked as completed`);
    } catch (error) {
      console.error("Error updating print job status:", error);
    }
  };
  const handlePrintLocalDocument = () => {
    const documentPath = "../../../public/dummy.pdf"; // Replace with your document's path
    const newWindow = window.open(documentPath, "_blank");
    
    if (newWindow) {
      newWindow.onload = () => {
        newWindow.print(); // Automatically open the print dialog
      };
    } else {
      alert("Popup blocked! Allow popups and try again.");
    }
  };


  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("printing"); // Clear printing service provider session
    window.location.href = "/print-login"; // Redirect to login page
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
              
              <a href="/print-profile" className="text-gray-700 hover:text-blue-600">
                Profile
              </a>
              <a
                onClick={handleLogout}
                className="text-black-700 hover:text-red-600"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Printing Service Provider Dashboard */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Printing Service Provider Dashboard
        </h2>

        {/* Print Jobs List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Job ID</th>
                <th className="text-left py-2">File Name</th>
                <th className="text-left py-2">Pages</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {printJobs.map((job) => (
                <tr key={job.id} className="border-b">
                  <td className="py-2">{job.id}</td>
                  <td className="py-2">{job.file_name}</td>
                  <td className="py-2">{job.pages}</td>
                  <td
                    className={`py-2 ${
                      job.status === "completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {job.status}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => ( handlePrintLocalDocument, handlePrintJob(job) )}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      disabled={job.status === "completed"}
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Popup */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Print Job</h3>
            <p>
              Are you sure you want to mark <strong>{selectedJob.file_name}</strong> as
              completed?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedJob(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPrint}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintDashboard;