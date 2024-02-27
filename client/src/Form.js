// Form.js
import React, { useState } from 'react';
import './Form.css'; // Import your CSS file for styling (create this file if it doesn't exist)

export const Form = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [courseUrl, setCourseUrl] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission (e.g., send data to a server)
    console.log('Form submitted:', { name, email, courseUrl });
  };

  return (
    <form className="custom-form" onSubmit={handleSubmit}>

      <div className="form-group">
        <label htmlFor="name" className="form-label">What do we call you?</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
          placeholder='Enter name'
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Where do we notify you?</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          placeholder='Enter email address'
        />
      </div>

      <div className="form-group">
        <label htmlFor="courseUrl" className="form-label">Which course to track?</label>
        <input
          type="text"
          id="courseUrl"
          value={courseUrl}
          onChange={(e) => setCourseUrl(e.target.value)}
          className="form-input"
          placeholder='Enter course URL'
        />
      </div>

      <button type="submit" className="form-button">Start tracking!</button>
    </form>
  );
}
