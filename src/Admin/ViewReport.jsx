// src/pages/admin/ViewReport.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ViewReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const fetchReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reports/${id}`
      );
      console.log("Report response:", response.data);
      setReport(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setError("Failed to load report details.");
    }
  };

  const updateReportStatus = async (newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/reports/${id}`, {
        status: newStatus,
      });
      setReport((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Error updating report status:", error);
      setError("Failed to update report status.");
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    updateReportStatus(newStatus);
  };

  const reportAssignment = async () => {
    const user_id = JSON.parse(localStorage.getItem("userId"));
    const report_id = id;
    try {
      const response = await axios.post(`http://localhost:5000/api/report_assignments`, {
        user_id,
        report_id,
        role: "investigator",
      });
    }
    catch (error) {
      console.error("Error assigning report:", error);
      setError("Failed to assign report.");
    }
  }

  useEffect(() => {
    fetchReport();
  }, [id]);

  if (error) {
    return (
      <div className="p-8">
        <h2 className="text-lg font-semibold">Error</h2>
        <p>{error}</p>
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate(-1)}
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Report Details</h1>
      <div className="bg-white shadow p-6 rounded space-y-4">
        {report ? (
          <div>
            <p>
              <strong>Title:</strong> {report.title}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(report.created_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {report.status}
            </p>
            <p>
              <strong>Description:</strong> {report.description}
            </p>
          </div>
        ) : (
          <p>Loading report details...</p>
        )}
        <div className="mt-10">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate(-1)}
          >
            Back to Reports
          </button>
          {report && report.status === "inProgress" ? (
            <button
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded cursor-default"
              disabled
            >
              Active
            </button>
          ) : (
            <button
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => { reportAssignment(); handleStatusChange("inProgress"); }}
            >
              Investigate Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
