import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainManagement = () => {
  const [trains, setTrains] = useState([]);
  const [editingTrain, setEditingTrain] = useState(null);
  const [trainData, setTrainData] = useState({
    name: '',
    platform: '',
    time: '',
  });

  useEffect(() => {
    // Fetch trains from the backend API
    axios.get('http://localhost:8080/trains')
      .then(response => setTrains(response.data))
      .catch(error => console.error('Error fetching trains:', error));
  }, []);

  const handleEditClick = (train) => {
    // Set the train to be edited in the TrainForm
    setEditingTrain(train);
    setTrainData(train);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData({ ...trainData, [name]: value });
  };

  const handleSaveOrUpdate = () => {
    // Determine whether to send a POST or PUT request based on the existence of editingTrain.id
    const requestMethod = editingTrain?.id ? 'put' : 'post';
    const url = editingTrain?.id ? `http://localhost:8080/trains/${editingTrain.id}` : 'http://localhost:8080/trains';

    // Send the request to save or update the train
    axios[requestMethod](url, trainData)
      .then(response => {
        console.log('Train saved successfully:', response.data);
        // Reset the form and editing state after successful submission
        setTrainData({
          name: '',
          platform: '',
          time: '',
        });
        setEditingTrain(null);
        // Reload the list of trains
        axios.get('http://localhost:8080/trains')
          .then(response => setTrains(response.data))
          .catch(error => console.error('Error fetching trains:', error));
      })
      .catch(error => console.error('Error saving or updating train:', error));
  };

  return (
    <div>
      <h2>Train Management</h2>
      <div>
        <h3>Add or Update Train</h3>
        <form onSubmit={handleSaveOrUpdate}>
          <label>
            Train Name:
            <input
              type="text"
              name="name"
              value={trainData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Platform:
            <input
              type="text"
              name="platform"
              value={trainData.platform}
              onChange={handleChange}
            />
          </label>
          <label>
            Arrival Time:
            <input
              type="text"
              name="time"
              value={trainData.time}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Train</button>
        </form>
      </div>
      <div>
        <h3>Train List</h3>
        <table>
          {/* Table header */}
          <thead>
            <tr>
              <th>Train Name</th>
              <th>Platform</th>
              <th>Arrival Time</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {trains.map(train => (
              <tr key={train.id}>
                <td>{train.name}</td>
                <td>{train.platform}</td>
                <td>{train.time}</td>
                <td>
                  <button onClick={() => handleEditClick(train)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainManagement;
