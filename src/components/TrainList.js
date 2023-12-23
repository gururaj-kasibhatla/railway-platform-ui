import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch trains from the backend API
    axios.get('http://localhost:8080/trains')
      .then(response => setTrains(response.data))
      .catch(error => console.error('Error fetching trains:', error));
  }, []);

  return (
    <div>
      <h2>Train List</h2>
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Platform</th>
            <th>Arrival Time</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {trains.map(train => (
            <tr key={train.id}>
              <td>{train.name}</td>
              <td>{train.platform}</td>
              <td>{train.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainList;
