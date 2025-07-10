// src/pages/admin/ViewReport.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ViewReport() {
  const { id } = useParams();

  // Mock data for demo
  const mockReports = [
    {
      id: '101',
      title: 'Bribery at checkpoint',
      description: 'Officials at XYZ checkpoint are taking bribes from motorists...',
      reporter: 'Anonymous',
      date: '2025-06-12',
      status: 'Under Review'
    },
    {
      id: '102',
      title: 'Illegal dumping',
      description: 'Someone is dumping industrial waste near River ABC...',
      reporter: 'John Doe',
      date: '2025-06-10',
      status: 'Open'
    }
  ];

  const report = mockReports.find(r => r.id === id);

  if (!report) {
    return (
      <div className="p-8">
        <h2 className="text-lg font-semibold">Report Not Found</h2>
        <Link to="/admin/reports" className="text-blue-600 underline">Back to Reports</Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Report Details</h1>
      <div className="bg-white shadow p-6 rounded space-y-4">
        <p><strong>Title:</strong> {report.title}</p>
        <p><strong>Description:</strong> {report.description}</p>
        <p><strong>Reporter:</strong> {report.reporter}</p>
        <p><strong>Date:</strong> {report.date}</p>
        <p><strong>Status:</strong> {report.status}</p>
      </div>
      <div className="mt-6">
        <Link to="/admin/reports" className="text-blue-600 underline">← Back to Reports</Link>
      </div>
    </div>
  );
}
