// SearchComponent.jsx

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, setDoc, arrayUnion, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { firestore } from '../firebase';


import Modal from './Modal'; // Assuming you have a Modal component

const collectionRef = collection(firestore, 'rooms');



const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedResult, setSelectedResult] = useState(null); // Selected result details
  console.log(selectedResult);
  
const userEmail = localStorage.getItem('email');

// Function to handle roommate confirmation
const confirmRoommate = async (email) => {
  const collectionRef = collection(firestore, 'rooms');

  try {
    // Step 1: Add userEmail to the specified email's roommate list
    const emailQuery = query(collectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnapshot) => {
        console.log(`Fetched room document for email: ${email}`, docSnapshot.data());
        console.log(`Adding user email ${userEmail} to ${email}'s roommates array`);

        // Update the roommates array in the fetched document
        await updateDoc(docSnapshot.ref, {
          roommates: arrayUnion(userEmail),
        });
        
      });
    } else {
      console.error(`Room not found for ${email}. Creating a new room document.`);
      const roomRef = doc(collectionRef, email);

      // Create a new document with the initial roommates array if it doesn't exist
      await setDoc(roomRef, {
        email,
        roommates: [userEmail],
      });
      
    }

    // Step 2: Add email to the userEmail's roommate list
    const userQuery = query(collectionRef, where('email', '==', userEmail));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      userSnapshot.forEach(async (docSnapshot) => {
        console.log(`Fetched room document for user email: ${userEmail}`, docSnapshot.data());
        console.log(`Adding ${email} to ${userEmail}'s roommates array`);

        // Update the roommates array in the user's document
        await updateDoc(docSnapshot.ref, {
          roommates: arrayUnion(email),
        });
        
      });
    } else {
      console.error(`Room not found for ${userEmail}. Creating a new room document.`);
      const userRoomRef = doc(collectionRef, userEmail);

      // Create a new document for the user if it doesn't exist
      await setDoc(userRoomRef, {
        email: userEmail,
        roommates: [email],
      });
      
    }

    toast.success(`Roommate confirmation completed between ${userEmail} and ${email}`);
    setIsModalOpen(false);
  } catch (error) {
    console.error('Error confirming roommate:', error);
    toast.error('Error confirming roommate');
  }
};


  // Function to open modal with selected user details
  const openModal = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResult(null);
  };


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(firestore, 'rooms');
        
        // Construct query to fetch data from Firestore
        const stateQuery = query(collectionRef, where('state', '>=', ''), where('state', '<=', '\uf8ff'));
        const hobiesQuery = query(collectionRef, where('hobies', '>=', ''), where('hobies', '<=', '\uf8ff'));
        const messQuery = query(collectionRef, where('mess', '>=', ''), where('mess', '<=', '\uf8ff'));
        
        // Execute queries in parallel
        const [stateSnapshot, hobiesSnapshot, messSnapshot] = await Promise.all([
          getDocs(stateQuery),
          getDocs(hobiesQuery),
          getDocs(messQuery),
        ]);
  
        // Process and combine results, removing duplicates
        const searchData = new Set();
        
        const processSnapshot = (snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            searchData.add(JSON.stringify(data)); // Add as string to avoid duplicates
          });
        };
  
        processSnapshot(stateSnapshot);
        processSnapshot(hobiesSnapshot);
        processSnapshot(messSnapshot);
  
        // Normalize and filter client-side for case-insensitive matching
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        const searchTerms = lowerCaseSearchQuery.split(';').map(term => term.trim());
  
        // Calculate match percentage and filter results
        const filteredData = Array.from(searchData).map(JSON.parse).map((item) => {
          let matchCount = 0;
          const totalTerms = searchTerms.length;
  
          // Helper function to calculate term match in a field
          const matchTerm = (fieldValue) => {
            return searchTerms.filter((term) => fieldValue.toLowerCase().includes(term)).length;
          };
  
          // Match against state, hobies, and mess
          const stateMatch = item.state ? matchTerm(item.state) : 0;
          const hobiesMatch = item.hobies ? matchTerm(item.hobies) : 0;
          const messMatch = item.mess ? matchTerm(item.mess) : 0;
  
          matchCount = stateMatch + hobiesMatch + messMatch;
  
          // Calculate match percentage
          const matchPercentage = ((matchCount / totalTerms) * 100).toFixed(2);
  
          return { ...item, matchPercentage };
        });
  
        const filteredResults = filteredData.filter(result => parseFloat(result.matchPercentage) > 25);

        // Sort by match percentage
        const sortedData = filteredResults.sort((a, b) => b.matchPercentage - a.matchPercentage);
  
        setSearchResults(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (searchQuery) {
      getData();
    } else {
      setSearchResults([]); // Clear results if search query is empty
    }
  }, [searchQuery]);
  
  
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ fontSize: '20px' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by State, hobies, or Mess Type..."
        style={{
          padding: '8px',
          marginRight: '8px',
          border: '1px solid #ccc',
          borderRadius: '20px',
          boxSizing: 'border-box',
          width: '500px',
        }}
      />
      <button
        onClick={() => searchQuery && setSearchQuery(searchQuery)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
      
      <div className="search-results" style={{ marginTop: '20px' }}>
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div
              key={index}
              className="search-result-item"
              style={{
                cursor: 'pointer',
                padding: '8px',
                borderBottom: '1px solid #ccc',
                border: '2px solid black',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '10px',
              }}
              onClick={() => openModal(result)} // Open modal on click
            >
              <div>Name: {result.name}</div>
              <div>Room Number: {result.roomNumber}</div>
              {/* <div>Block: {result.blockName}</div> */}
              <div>Phone Number: {result.phoneNumber}</div>
              <div>Register Number: {result.regNo}</div>
              <div>Email: {result.email}</div>
              <div>State: {result.state}</div>
              <div>hobies: {result.hobies}</div>
              <div>Mess Type: {result.mess}</div>
              <div>
              <strong>Match Percentage:</strong> {result.matchPercentage}%
            </div>
            </div>
          ))
        ) : (
          <div className="no-results-message" style={{ padding: '8px', color: '#777' }}>
            No results found
          </div>
        )}
      </div>
      {/* Modal to confirm roommate */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedResult && (
          <div>
            <h2>Confirm Roommate</h2>
            <div>
              <p>Name: {selectedResult.name}</p>
              <p>Phone Number: {selectedResult.phoneNumber}</p>
              <p>Register Number: {selectedResult.regNo}</p>
              <p>Email: {selectedResult.email}</p>
              <p>State: {selectedResult.state}</p>
              <p>Hobbies: {selectedResult.hobies}</p>
              <p>Mess Type: {selectedResult.mess}</p>
              <p>
                <strong>Match Percentage:</strong> {selectedResult.matchPercentage}%
              </p>
            </div>
            <div>
              <button
                onClick={() => confirmRoommate(selectedResult.email)} // Confirm roommate
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                Confirm Roommate
              </button>
              <button
                onClick={closeModal} // Go back
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchComponent;