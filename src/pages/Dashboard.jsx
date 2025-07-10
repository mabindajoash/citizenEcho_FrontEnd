import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [report, setReport] = useState({
    title: "",
    description: "",
  });
  const [reports, setReports] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:5000/api/reports", {
        title: report.title,
        description: report.description,
      });
      console.log("Submit response:", response.data);

      if (response.status === 201) {
        setSuccess(true);
        setReport({ title: "", description: "" });

        const user_id = JSON.parse(localStorage.getItem("userId"));
        const report_id = response.data.id;
        await axios.post(`http://localhost:5000/api/report_assignments`, {
          report_id: report_id,
          user_id: user_id,
        });
        console.log("Report assigned to user:", response.data);

        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError("Unexpected response.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("Failed to submit report.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const id = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    const getReports = async (
      id = JSON.parse(localStorage.getItem("userId"))
    ) => {
      try {
        setIsFetching(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5000/api/users/${id}/assigned-reports`
        );
        console.log("Fetched reports:", response.data);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsFetching(false);
      }
    };
    getReports();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";
    const normalized = status.trim().toLowerCase();
    switch (normalized) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in review":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const dummyNotification = [
    {
      title: "New Feature Update",
      message: "We have added a new feature to enhance your reporting experience.",
      date: "2023-10-01",
    },
    {
      title: "Maintenance Notice",
      message: "Scheduled maintenance will occur on 2023-10-05 from 2 AM to 4 AM.",
      date: "2023-09-30",
    },
  ]

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Top Bar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">
          CitizenEcho - Reporting Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Logged in as: {JSON.parse(localStorage.getItem("email")) || "Guest"}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Report Submission Form */}
        <div className="bg-white p-6 rounded-lg shadow h-[.96]">
          <h2 className="text-lg font-semibold mb-4 text-blue-700">
            Submit a New Report
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={report.title}
              onChange={(e) => setReport({ ...report, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            {/*<select
              value={report.category}
              onChange={(e) =>
                setReport({ ...report, category: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="corruption">Corruption</option>
              <option value="harassment">Harassment</option>
              <option value="abuse">Abuse of power</option>
              <option value="environment">Environmental violation</option>
            </select>*/}
            <textarea
              placeholder="Description"
              value={report.description}
              onChange={(e) =>
                setReport({ ...report, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
            <button
              type="submit"
              className={`w-full py-2 ${
                isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } transition duration-200 text-white font-medium rounded-md shadow-md`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting report..." : "Submit Report"}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
          </form>
        </div>

        {/* Submitted Reports List */}
        <div className="bg-white p-6 rounded-lg shadow h-[.96] overflow-auto">
          <h2 className="text-lg font-semibold mb-4 text-blue-700">
            My Reports
          </h2>
          <div className="space-y-4">
            {reports.map((r) => (
              <div key={r.id} className="border p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{r.title}</h3>

                  <span
                    className={`px-2 py-1 text-sm rounded ${getStatusColor(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                  {r.description}
                </p>
                <p className="text-sm text-gray-600">
                  Submitted on: {new Date(r.created_at).toLocaleDateString()}
                </p>
                {r.feedback && (
                  <p className="mt-2 text-sm text-gray-800">
                    <strong>Feedback:</strong> {r.feedback}
                  </p>
                )}
              </div>
            ))}
            {reports.length === 0 && (
              <p className="text-gray-500">No reports submitted yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Notification Section */}
      <div className="p-6 mt-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-blue-700">
            Notifications
          </h2>
          <ul className="divide-y divide-gray-200">
            {dummyNotification.map((notif, index) => (
              <li key={index} className="py-3">
                <h3 className="font-semibold text-blue-800">{notif.title}</h3>
                <p className="text-sm text-gray-700">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
