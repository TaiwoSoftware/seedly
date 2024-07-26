'use client'
import { useState, useEffect } from 'react';

export default function Page() {
  const [name, setName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('name');
      if (storedName) {
        setName(storedName);
      }
    }
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Names</th>
            <th>Phone numbers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>0916255174</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
