"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [username, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://simon-4636.restdb.io/rest/datauser?max=2", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": "66a6c2e12212c7e5b78ea3fd" // Replace with your actual API key
          }
        });
        const data = await response.json();
        if (data.length > 0) {
          setUserName(data[0].username);
          setPhoneNumber(data[0].phoneNumber);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    try {
      // Directly push the updated data to the API
      const saveResponse = await fetch("https://simon-4636.restdb.io/rest/datauser", {
        method: "POST", // Change to POST if you are creating a new record
        headers: {
          "Content-Type": "application/json",
          "x-apikey": "66a6c2e12212c7e5b78ea3fd" // Replace with your actual API key
        },
        body: JSON.stringify({ username, phoneNumber })
      });
  
      if (!saveResponse.ok) {
        throw new Error("Failed to save the updates");
      }
  
      const result = await saveResponse.json();
      console.log("Success:", result);
      setIsEditing(false);
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to save data");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Names</th>
              <th className="py-2 px-4 border-b text-center">Phone numbers</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 text-center border-b">
                {isEditing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border p-2 w-full"
                  />
                ) : (
                  username
                )}
              </td>
              <td className="py-2 px-4 text-center border-b">
                {isEditing ? (
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border p-2 w-full"
                  />
                ) : (
                  phoneNumber
                )}
              </td>
              <td className="py-2 px-4 text-center border-b">
                {isEditing ? (
                  <>
                    <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded mr-2">Save</button>
                    <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white p-2 rounded">Cancel</button>
                  </>
                ) : (
                  <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded">Edit</button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
}
