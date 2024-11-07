// FindMatches.jsx

import React, { useState } from 'react';
import axios from 'axios';
import ViewMatches from './ViewMatches';

const FindMatches = () => {
  const [searchData, setSearchData] = useState({ 
    state: '', 
    messtype: 'Vegetarian' 
  });
  const [matches, setMatches] = useState([]);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/matching/find-matches', { params: searchData });
      setMatches(response.data); // Expecting response.data to be an array of match objects
    } catch (error) {
      console.error('Error finding matches:', error);
    }
  };

  return (
    <div>
      <h2>Find Roommate Matches</h2>
      <input 
        type="text" 
        name="state" 
        placeholder="State" 
        value={searchData.state} 
        onChange={handleChange} 
        required 
      />
      <select 
        name="messtype" 
        value={searchData.messtype} 
        onChange={handleChange} 
        required
      >
        <option value="Vegetarian">Vegetarian</option>
        <option value="Non-Vegetarian">Non-Vegetarian</option>
        <option value="Special">Special</option>
      </select>
      <button onClick={handleSearch} className="btn btn-secondary">Search</button>
      <ViewMatches matches={matches} />
    </div>
  );
};

export default FindMatches;