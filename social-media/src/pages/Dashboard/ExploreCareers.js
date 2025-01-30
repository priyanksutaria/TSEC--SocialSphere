import React from 'react';
import './ExploreCareers.css'; // Import the CSS for styling
import { NavLink } from 'react-router-dom';

const ExploreCareers = () => {
  // Dummy data for career categories and example career paths
  const careerCategories = [
    {
      category: 'Technology',
      careers: ['Software Developer', 'Data Scientist', 'Cybersecurity Analyst'],
    },
    {
      category: 'Design',
      careers: ['Graphic Designer', 'UX/UI Designer', 'Interior Designer'],
    },
    {
      category: 'Healthcare',
      careers: ['Nurse', 'Pharmacist', 'Physical Therapist'],
    },
    {
      category: 'Business',
      careers: ['Entrepreneur', 'Marketing Manager', 'Business Analyst'],
    },
    {
      category: 'Arts & Media',
      careers: ['Journalist', 'Photographer', 'Film Director'],
    },
    {
      category: 'Engineering',
      careers: ['Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer'],
    },
  ];

  return (
    <div className="explore-careers-container">
      <h1>Explore Career Paths</h1>
      <p className="intro-text">
        Discover a variety of career options across different industries. Whether you're interested in technology, design, healthcare, or business, there's a career for you! Below, you can explore popular careers within different fields and find the path that best suits your skills and interests.
      </p>

      {/* Career categories */}
      <div className="career-categories">
        {careerCategories.map((categoryItem, index) => (
          <div key={index} className="category-section">
            <h2>{categoryItem.category}</h2>
            <ul className="career-list">
              {categoryItem.careers.map((career, idx) => (
                <li key={idx}>{career}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Additional guidance section */}
      <div className="career-guidance">
        <h3>How to Choose the Right Career?</h3>
        <p>
          Choosing the right career path involves understanding your interests, strengths, and long-term goals. Explore different options and try to imagine yourself working in those roles. Don't be afraid to experiment with internships or volunteering in different fields to get a hands-on experience.
        </p>

        <h3>What's Next?</h3>
        <p>
          Once you have an idea of which career path excites you, dive deeper! Take related courses, network with professionals, or participate in job simulations to see if that career is the right fit. Click below to explore detailed career paths or start job simulations to get a feel for what it's like to work in these fields.
        </p>

        <div className="explore-buttons">
          <NavLink to="/dashboard/dbroadmap">
            <button className="explore-btn">Explore Career Roadmaps</button>
          </NavLink>
          <NavLink to="/dashboard/dbjobsim">
            <button className="explore-btn">Start Job Simulations</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ExploreCareers;
