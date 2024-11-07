import React, { useState, useEffect } from 'react';
import TaxiListingForm from './TaxiListingForm';
import Modal from './Modal';
import TaxiDetail from './TaxiDetail'; // Import the TaxiDetail component

export default function TaxiShare() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [bookedTaxis, setBookedTaxis] = useState([]);
  const [selectedOption, setSelectedOption] = useState('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaxi, setSelectedTaxi] = useState(null);

  // Function to handle clicking on a taxi to view its details
  const handleTaxiClick = (taxi) => {
    setSelectedTaxi(taxi); // Save the selected taxi details
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTaxi(null); // Clear the selected taxi
    if (selectedOption === 'search') {
      getSearchData();
    } else if (selectedOption === 'booked') {
      getBookedTaxis();
    }
  };

  // Function to fetch search results
  const getSearchData = async () => {
    setLoading(true);
    try {
      const userEmail = localStorage.getItem('email');
      
      const response = await fetch('http://localhost:5000/api/taxi/search-taxi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': userEmail,
        },
        body: JSON.stringify({ searchQuery }),
      });

      const data = await response.json();

      if (data.success) {
        const formattedData = data.data.map(item => ({
          _id: item._id,
          from: item.from,
          to: item.to,
          date: new Date(item.date).toLocaleDateString(),
          passengers: item.passengers,
        }));

        setSearchResults(formattedData);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch booked taxis for the user
  const getBookedTaxis = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/taxi/booked-taxis', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'email': localStorage.getItem('email'),
        },
      });

      const data = await response.json();

      if (data.success) {
        const formattedData = data.data.map(item => ({
          _id: item._id,
          from: item.from,
          to: item.to,
          date: new Date(item.date).toLocaleDateString(),
          passengers: item.passengers,
          owner: item.lister,
        }));

        setBookedTaxis(formattedData);
      } else {
        setBookedTaxis([]);
      }
    } catch (error) {
      console.error('Error fetching booked taxis:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle the option selection for "List Taxi", "Search Taxi", and "View Booked Taxis"
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() !== '') {
      getSearchData();
    }
    setSearchQuery('');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={() => handleOptionSelect('list')}
          style={{
            marginRight: '10px',
            border: selectedOption !== 'list' ? '1px solid black' : 'none',
            backgroundColor: selectedOption === 'list' ? '#007bff' : 'transparent',
            color: selectedOption === 'list' ? 'white' : 'black',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          List Taxi
        </button>
        <button
          onClick={() => handleOptionSelect('search')}
          style={{
            marginRight: '10px',
            border: selectedOption !== 'search' ? '1px solid black' : 'none',
            backgroundColor: selectedOption === 'search' ? '#007bff' : 'transparent',
            color: selectedOption === 'search' ? 'white' : 'black',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search Taxi
        </button>
        <button
          onClick={() => { handleOptionSelect('booked'); getBookedTaxis(); }}
          style={{
            border: selectedOption !== 'booked' ? '1px solid black' : 'none',
            backgroundColor: selectedOption === 'booked' ? '#007bff' : 'transparent',
            color: selectedOption === 'booked' ? 'white' : 'black',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          View Booked / Listed Taxis
        </button>
      </div>

      {selectedOption === 'list' && (
        <div style={{ marginTop: '20px' }}>
          <TaxiListingForm />
        </div>
      )}

      {selectedOption === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', fontSize: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={searchQuery === '' ? '' : searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
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
              onClick={handleSearchClick }
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
          </div>

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
                    width: '800px',
                    gap: '8px',
                    margin: '20px',
                  }}
                  onClick={() => handleTaxiClick(result)}
                >
                  <div>From: {result.from}</div>
                  <div>To: {result.to}</div>
                  <div>Date: {result.date}</div>
                  <div>Passengers: {result.passengers}</div>
                </div>
              ))
            ) : (
              <div className="no-results-message" style={{ padding: '8px', color: '#777' }}>
                No results found
              </div>
            )}
          </div>
        </div>
      )}

      {selectedOption === 'booked' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', fontSize: '25px' }}>
          <div className="booked-taxis">
            {loading ? (
              <div className="loading-message">Loading booked taxis...</div>
            ) : bookedTaxis.length > 0 ? (
              bookedTaxis.map((taxi, index) => (
                <div
                  key={index}
                  className="booked-taxi-item"
                  style={{
                    padding: '8px',
                    borderBottom: '1px solid #ccc',
                    border: '2px solid black',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '800px',
                    gap: '8px',
                    margin: '20px',
                  }}
                  
                >
                  <div>From: {taxi.from}</div>
                  <div>To: {taxi.to}</div>
                  <div>Date: {taxi.date}</div>
                  <div>Passengers: {taxi.passengers}</div>
                  <div>Lister: {taxi.owner}</div>
                </div>
              ))
            ) : (
              <div className="no-results-message" style={{ padding: '8px', color: '#777' }}>
                No booked taxis found
              </div>
            )}
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedTaxi && (
          <TaxiDetail taxi={selectedTaxi} onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
}

