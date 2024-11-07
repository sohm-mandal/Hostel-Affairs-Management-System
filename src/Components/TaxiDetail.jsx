function TaxiDetail({ taxi, onClose }) {
    const handleBookTaxi = async () => {
      try {
        const userEmail = localStorage.getItem('email');
        const response = await fetch(`http://localhost:5000/api/taxi/book`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail, taxi }), // Include taxi data
        });
  
        const data = await response.json();
        if (data.success) {
          alert('Taxi booked successfully!');
          onClose(); 
        } else {
          alert('Error booking taxi');
        }
      } catch (error) {
        console.error('Error booking taxi:', error);
      }
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', fontSize: '22px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>Taxi Details</h2>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ fontSize: '20px', color: '#777' }}>From:</span> <span style={{ fontSize: '25px', fontWeight: 'bold', color: '#333' }}>{taxi.from}</span>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ fontSize: '20px', color: '#777' }}>To:</span> <span style={{  fontSize: '25px', fontWeight: 'bold', color: '#333' }}>{taxi.to}</span>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <span style={{ fontSize: '20px', color: '#777' }}>Date:</span> <span style={{ fontSize: '25px', fontWeight: 'bold', color: '#333' }}>{taxi.date}</span>
          </div>
          <div style={{ marginBottom: '25px' }}>
            <span style={{ fontSize: '20px', color: '#777' }}>Passengers:</span> <span style={{ fontSize: '25px', fontWeight: 'bold', color: '#333' }}>{taxi.passengers}</span>
          </div>
          <button onClick={handleBookTaxi} style={{ marginRight: '10px', padding: '15px 30px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Book Taxi
          </button>
          <button onClick={onClose} style={{ padding: '15px 30px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  export default TaxiDetail;