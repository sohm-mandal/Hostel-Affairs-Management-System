import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { toast } from 'react-toastify';
import './ButtonCSS.css';
import SearchComponent from './SearchComponent';
import RoomListingForm from './RoomListingForm';
import Character from '../images/Screenshot 2024-04-18 at 9.03.03 AM.png';

export default function Roommate() {
  const [selectedButton, setSelectedButton] = useState('');
  const userEmail = localStorage.getItem('email');
  const [roommates, setRoommates] = useState([]);
  const collectionRef = collection(firestore, 'rooms');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const fetchRoommates = async () => {
    try {
      const userQuery = query(collectionRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(userQuery);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        const roommateEmails = userDoc.roommates || [];

        // Fetch full details of each roommate
        const roommateDetails = await Promise.all(roommateEmails.map(async (email) => {
          const roommateQuery = query(collectionRef, where('email', '==', email));
          const roommateSnapshot = await getDocs(roommateQuery);

          if (!roommateSnapshot.empty) {
            return roommateSnapshot.docs[0].data();
          }
          return null;
        }));

        // Filter out any null values if a roommate document was not found
        setRoommates(roommateDetails.filter(detail => detail !== null));
      } else {
        toast.error('No roommates found.');
        setRoommates([]);
      }
    } catch (error) {
      console.error('Error fetching roommates:', error);
      toast.error('Error fetching roommates');
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ fontSize: "70px" }}>Find your VIT Room-mate.</div>
      <div style={{
        width: '50%', backgroundColor: '#5199EB', height: "200px", borderRadius: '20px', display: 'flex',
        flexDirection: "row", padding: "5px"
      }}>
        <p style={{
          flexBasis: '80%', fontSize: "30px", justifyContent: 'center',
          alignContent: "center", color: "white"
        }}>
          Vit's Favourite roommate finder.
        </p>
        <img src={Character} alt="Character" style={{ maxHeight: "200px", flexBasis: "20%" }} />
      </div>

      <div style={{ fontSize: "25px", marginTop: "20px" }}>
        <button
          className={selectedButton === 'find' ? 'selected' : ''}
          onClick={() => handleButtonClick('find')}
        >
          Find your roommate
        </button>
        <button
          className={selectedButton === 'list' ? 'selected' : ''}
          onClick={() => handleButtonClick('list')}
        >
          Add Your Preference
        </button>
        <button
          onClick={() => {
            handleButtonClick('view');
            fetchRoommates();
          }}
        >
          View Roommates
        </button>

        {selectedButton === 'find' && <div style={{ marginTop: "20px" }}>
          <SearchComponent />
        </div>}
        {selectedButton === 'list' && <div style={{ marginTop: "20px" }}>
          <RoomListingForm />
        </div>}
        {selectedButton === 'view' && (
          <div style={{ marginTop: "20px" }}>
            <h3>Your Roommates:</h3>
            {roommates.length > 0 ? (
              <ul>
                {roommates.map((roommate, index) => (
                  <li key={index} style={{
                    cursor: 'pointer',
                    padding: '8px',
                    borderBottom: '1px solid #ccc',
                    border: '2px solid black',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: '10px', }}>
                    <p><strong>Name:</strong> {roommate.name}</p>
                    <p><strong>Phone Number:</strong> {roommate.phoneNumber}</p>
                    <p><strong>Register Number:</strong> {roommate.regNo}</p>
                    <p><strong>Email:</strong> {roommate.email}</p>
                    <p><strong>State:</strong> {roommate.state}</p>
                    <p><strong>Hobbies:</strong> {roommate.hobies}</p>
                    <p><strong>Mess Type:</strong> {roommate.mess}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No roommates found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
