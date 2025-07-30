import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Report() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("anonymous");

  // Anonymous form state
  const [anonData, setAnonData] = useState({ title: "", description: "" });

  // Registered form state
  const [regData, setRegData] = useState({ subject: "", description: "" });

  const handleAnonSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/reports", JSON.stringify(anonData), {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Anonymous report submitted:", response.data);
      if (response.status === 201) {
        setAnonData({ title: "", description: "" });
        alert("Anonymous report submitted successfully");
      } else {
        alert("Failed to submit anonymous report");
      }
    } catch (err) {
      console.error("Error submitting anonymous report:", err);
      alert("An error occurred while submitting the report");
    }
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await submitRegisteredReport(regData, token);
      alert("Registered report submitted successfully");
    } catch (err) {
      alert("Failed to submit registered report");
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("anonymous")}
          className={`px-4 py-2 rounded ${activeTab === "anonymous" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Anonymous Report
        </button>
        <button
          onClick={() => navigate("/login")} // ✅ redirect on click
          className="px-4 py-2 rounded bg-gray-200"
        >
          Registered Report
        </button>
      </div>

      {activeTab === "anonymous" && (
        <form onSubmit={handleAnonSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={anonData.title}
            onChange={(e) => setAnonData({ ...anonData, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={anonData.description}
            onChange={(e) => setAnonData({ ...anonData, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Submit Anonymously
          </button>
        </form>
      )}

      {/* This block won't be shown unless you keep activeTab === 'registered' logic */}
      {activeTab === "registered" && (
        <form onSubmit={handleRegSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={regData.subject}
            onChange={(e) => setRegData({ ...regData, subject: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={regData.description}
            onChange={(e) => setRegData({ ...regData, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit as Registered User
          </button>
        </form>
      )}
    </div>
  );
}
