'use client'
import { useState, useEffect } from 'react';

export default function Page() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('firstname');
      const storedNumber = localStorage.getItem('number');
      setName(storedName);
      setNumber(storedNumber);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setNewName(name);
    setNewNumber(number);
  };

  const handleSave = () => {
    setName(newName);
    setNumber(newNumber);
    localStorage.setItem('name', newName);
    localStorage.setItem('number', newNumber);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Names</th>
            <th className="py-2 px-4 border-b">Phone numbers</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 text-center border-b">{name}</td>
            <td className="py-2 px-4 text-center border-b">{number}</td>
            <td className="py-2 px-4 border-b">
              <button 
                className="bg-blue-500 text-white py-1 px-2 rounded" 
                onClick={handleEdit}
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {isEditing && (
        <div className="mt-4">
          <input 
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
            placeholder="Edit name" 
            className="border py-2 px-4 rounded mr-2"
          />
          <input 
            type="text" 
            value={newNumber} 
            onChange={(e) => setNewNumber(e.target.value)} 
            placeholder="Edit number" 
            className="border py-2 px-4 rounded mr-2"
          />
          <button 
            className="bg-green-500 text-white py-1 px-2 rounded" 
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
