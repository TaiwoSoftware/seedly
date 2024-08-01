/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect } from "react";

export default function page() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://simon-4636.restdb.io/rest/datauser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": "66a6c2e12212c7e5b78ea3fd" // Replace with your actual API key
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Registered Users</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-center">
            <tr>
              <th scope="col" className="py-3 px-4 border-b">Username</th>
              <th scope="col" className="py-3 px-4 border-b">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-white border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-center">{user.username}</td>
                <td className="py-3 px-4 text-center">{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
