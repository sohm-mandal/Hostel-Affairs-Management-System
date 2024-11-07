import React from 'react';
import './TeamInfo.css'; // Import the CSS file for styling

const TeamInfo = ({ name, position,imageSrc,linkedin,github }) => {

  return (
    <div className="column">
      <div className="card">
        <div className="container">
          <h2>{name}</h2>
          <p className="title">{position}</p>
          <div>
          <a href={github}><button className="github">Github</button></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamInfo;
