import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/reports');
      console.log('Reports response:', response.data);
      setReports(response.data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";
    const normalized = status.trim().toLowerCase();
    switch (normalized) {
      case "pending":
        return "bg-yellow-100 text-gray-900";
      case "inProgress":
        return "bg-blue-100 text-gray-900";
      case "resolved":
        return "bg-green-100 text-gray-900";
      case "rejected":
        return "bg-red-100 text-gray-900";
      default:
        return "bg-blue-400 text-gray-900";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Reports</h1>

      <div className="bg-white shadow rounded-lg h-80 overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-4">Id</th>
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t hover:bg-gray-50">
                <td className="p-4 text-ellipsis">{(() => {
                    const id = String(report.id);
                    const visible = id.slice(0, Math.ceil(id.length / 4));
                    const masked = "*".repeat(id.length - visible.length);
                    return visible + masked;
                  })()}</td>
                <td className="p-4">{report.title}</td>
                <td className="p-4">{new Date(report.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      getStatusColor(report.status)
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    to={`/admin/reports/${report.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
