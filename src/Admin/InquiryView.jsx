import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


export default function InquiryView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [error, setError] = useState(null);

  const fetchInquiry = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/inquiries/${id}`);
      setInquiry(response.data);
    } catch (error) {
      console.error("Error fetching inquiry data:", error);
      setError("Failed to load inquiry details.");
    }
  };

  useEffect(() => {
    fetchInquiry();
  }, [id]);
  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        {error}
      </div>
    );
  }
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h1 className="text-2xl font-semibold mb-4">Inquiry Details</h1>
      {inquiry ? (
        <div>
          <p><strong>Email:</strong> {inquiry.email}</p>
          <p><strong>Date:</strong> {new Date(inquiry.created_at).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {inquiry.status}</p>
          <p><strong>Message:</strong> {inquiry.message}</p>
        </div>
      ) : (
        <p>Loading inquiry details...</p>
      )}
      <div className='flex space-x-4 items-center mt-6'>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Back to Inquiries
      </button>
      <button
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
      >
        Answer Inquiry
      </button>
      </div>
    </div>
  );
}
