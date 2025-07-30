import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "investigator",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      const filteredUsers = response.data.filter(
        (user) => user.role === "investigator"
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData
      );

      if (response.status === 201) {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "investigator",
        });
        setShowModal(false);
        fetchUsers();
      } else {
        console.error("Failed to add investigator");
      }
    } catch (error) {
      console.error("Error adding investigator:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-3">Users Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Admin
        </button>
      </div>

      <p className="text-sm text-gray-600 my-3">Total Users: {users.length}</p>
      <div className="bg-white shadow rounded-lg h-80 overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border-b p-2 text-left">ID</th>
              <th className="border-b p-2 text-left">Email</th>
              <th className="border-b p-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-b p-2 text-gray-700 text-sm">
                  {(() => {
                    const id = String(user.id);
                    const visible = id.slice(0, Math.ceil(id.length / 2));
                    const masked = "*".repeat(id.length - visible.length);
                    return visible + masked;
                  })()}
                </td>

                <td className="border-b p-2 text-gray-700 text-sm">
                  {(() => {
                    const [name, domain] = user.email.split("@");
                    const visible = name.slice(0, Math.ceil(name.length / 2));
                    const masked = "*".repeat(name.length - visible.length);
                    return `${visible}${masked}@${domain}`;
                  })()}
                </td>

                <td className="border-b p-2 text-gray-700 text-sm">Admin</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Add Admin</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full mb-3 p-2 border rounded"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
