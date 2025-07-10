import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/inquiries');
      console.log('Inquiries response:', response.data);
      setInquiries(response.data);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInquiries();
  }, []);

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

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Inquiries</h1>

      <div className="bg-white shadow rounded-lg h-80 overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{inq.name}</td>
                <td className="p-4 text-gray-700">{inq.email}</td>
                <td className="p-4">
                  {new Date(inq.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      getStatusColor(inq.status)
                    }`}
                  >
                    {inq.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link
                    to={`/admin/inquiries/${inq.id}`}
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
