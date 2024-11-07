import React, { useState, useEffect } from 'react';
import hostelData from './images.json'; // Import the JSON file
import Tiles from './Tiles';

const HostelInfo = ({ onPageChange }) => {
  const [tilesData, setTilesData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Home');

    const handleSelect = (option) => {
      setSelectedOption(option);
  };

  useEffect(() => {
    // Modify the hostelData to include both image URL and hostel name
    const modifiedData = hostelData.map(hostel => ({
      imageUrl: hostel.url,
      hostelName: hostel.hostelName,
    }));
    setTilesData(modifiedData);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', margin: '20px 0' }}>Hostel Info</h1>
      <Tiles tilesData={tilesData} />
      <div
        className={`nav-option${selectedOption === 'whatsapp' ? ' selected' : ''}`}
        style={{
          textAlign: 'center',
          padding: '10px 20px',
          margin: '10px auto',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '5px',
          cursor: 'pointer',
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center'
        }}
        onClick={() => {
          handleSelect('whatsapp');
          onPageChange('whatsApp');
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
          alt="Whatsapp Logo"
          style={{ height: '30px', marginRight: '10px' }}
        />
        Whatsapp Groups
      </div>
    </div>
  );
};

export default HostelInfo;
