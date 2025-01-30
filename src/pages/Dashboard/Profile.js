import React, { useContext, useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Profile.css';
import { NavLink } from 'react-router-dom';
import { AssessmentContext } from '../../context/AssessmentContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const Profile = () => {

  // Form state for user information
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    school: '',
    marksheet: null,
    aspirations: ['', '', ''],
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set the form as submitted
    console.log("Form Data:", formData);
  };

  return (
    <div className="profile-container">
      {/* Personal Information Section */}
      <div className="personal-info">
        <h2>Personal Information</h2>

        {/* Conditionally render the form or the submitted details */}
        {!isSubmitted ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        ) : (
          <div className="submitted-details">
            <ul>
              <li><strong>Name:</strong> {formData.name}</li>
              <li><strong>Email:</strong> {formData.email}</li>
              <li><strong>Age:</strong> {formData.age}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
