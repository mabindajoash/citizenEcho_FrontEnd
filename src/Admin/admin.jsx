import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function AdminHome() {
  const [investigator, setInvestigator] = useState({});
  const [cases, setCases] = useState([]);
  const [error, setError] = useState(null);


  const fetchCases = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      const response = await axios.get(`http://localhost:5000/api/users/${userId}/assigned-reports`);
      console.log("Cases response:", response.data);
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
      setError("Failed to load cases.");
    }
  };
  useEffect(() => {
    fetchCases();
  }, []);

  const fetchInvestigator = async () => {
    const userId = JSON.parse(localStorage.getItem("userId"));

    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setInvestigator(response.data);
    } catch (error) {
      console.error("Error fetching investigator data:", error);
    }
  };

  useEffect(() => {
    fetchInvestigator();
  }, []);

  const stats = [
    { label: 'Total Cases', value: 24 },
    { label: 'Cases Under Review', value: 5 },
    { label: 'Resolved Cases', value: 17 },
  ];


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">Welcome, {investigator.name}</h1>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Investigator Profile</h2>
        <p><strong>Name:</strong> {investigator.name}</p>
        <p><strong>Email:</strong> {investigator.email}</p>
        <p><strong>Role:</strong> {investigator.role}</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Edit Profile
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <p className="text-2xl font-bold text-gray-500">Total Cases</p>
            <p className="text-2xl font-bold">{cases.length}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <p className="text-2xl font-bold text-gray-500">Cases Under Review</p>
            <p className="text-2xl font-bold">{cases.filter(caseItem => caseItem.status === 'inProgress').length}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <p className="text-2xl font-bold text-gray-500">Resolved Cases</p>
            <p className="text-2xl font-bold">{cases.filter(caseItem => caseItem.status === 'closed').length}</p>
          </div>
        
      </div>

      {/* Cases Under Review */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">My Cases</h2>
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Case ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="text-center">
                <td className="border px-4 py-2">{caseItem.title}</td>
                <td className="border px-4 py-2">{caseItem.description}</td>
                <td className="border px-4 py-2">{caseItem.status}</td>
                <td className="border px-4 py-2">
                  {new Date(caseItem.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
