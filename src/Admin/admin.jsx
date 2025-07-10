import React from 'react';

export default function AdminHome() {
  const investigator = {
    name: 'Joash Mabinda',
    email: 'joash@example.com',
    role: 'Lead Investigator',
  };

  const stats = [
    { label: 'Total Cases', value: 24 },
    { label: 'Cases Under Review', value: 5 },
    { label: 'Resolved Cases', value: 17 },
  ];

  const cases = [
    { id: 101, title: 'Misuse of Funds', status: 'Under Review', date: '2025-06-01' },
    { id: 102, title: 'Unlawful Dismissal', status: 'Under Review', date: '2025-06-05' },
    { id: 103, title: 'Bribery Complaint', status: 'Under Review', date: '2025-06-07' },
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
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-lg text-center">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Cases Under Review */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Cases Under Review</h2>
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
                <td className="border px-4 py-2">{caseItem.id}</td>
                <td className="border px-4 py-2">{caseItem.title}</td>
                <td className="border px-4 py-2">{caseItem.status}</td>
                <td className="border px-4 py-2">{caseItem.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
