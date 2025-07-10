import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockInquiries = [
  {
    id: 101,
    email: 'anonymous1@example.com',
    date: '2025-06-10',
    status: 'Pending',
    message: 'There is suspected misuse of government procurement funds.',
  },
  {
    id: 102,
    email: 'reporter2@protonmail.com',
    date: '2025-06-09',
    status: 'In Progress',
    message: 'A senior manager is involved in unethical behavior in the finance department.',
  },
  {
    id: 103,
    email: 'whistleblower3@securemail.org',
    date: '2025-06-08',
    status: 'Resolved',
    message: 'Fake employee accounts have been found on the payroll.',
  },
];

export default function InquiryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inquiry = mockInquiries.find((inq) => inq.id === parseInt(id));

  if (!inquiry) {
    return (
      <div>
        <h1 className="text-xl font-bold text-red-600">Inquiry not found</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h1 className="text-2xl font-semibold mb-4">Inquiry Details</h1>
      <p><strong>ID:</strong> {inquiry.id}</p>
      <p><strong>Email:</strong> {inquiry.email}</p>
      <p><strong>Date:</strong> {inquiry.date}</p>
      <p><strong>Status:</strong> {inquiry.status}</p>
      <p className="mt-4"><strong>Message:</strong></p>
      <p className="text-gray-700 mt-1">{inquiry.message}</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Back to Inquiries
      </button>
    </div>
  );
}
