import React from 'react';
import './About.css';
import TeamInfo from './TeamInfo';

const About = () => {
  return (
    <div>
      <div className="about-section">
        <h1>About Us Page</h1>
        <p>Welcome to our project, the RoomMate Finder!</p>
        <p>We're here to simplify the roommate search process for university students. Whether you need a roommate for a room, apartment, or house, our platform connects you with compatible matches based on your preferences.

List your available room or search for rooms based on location, budget, and more. Our mission is to make finding roommates and accommodation easier, so you can enjoy a smooth transition to university life.</p>
      </div>
      <div style={{
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
}}>
      <div className="row">
        <TeamInfo 
          name="Soham Mandal"
          position="21BCT0201"
        />
      </div>
      <div className="row">
        <TeamInfo 
          name="Akash Anand"
          position="21BCT0216"
        />
      </div>
      <div className="row">
        <TeamInfo 
          name="Apoorv Gautam"
          position="21BCT0251"
        />
      </div>
      <div className="row">
        <TeamInfo 
          name="Shankhaneel Roy"
          position="Frontend"
        />
      </div>
      <div className="row">
        <TeamInfo 
          name="Santhosh Kumar"
          position="Frontend"
        />
      </div>
      <div className="row">
        <TeamInfo 
          name="Yash Priyadarshi"
          position="Frontend"
        />
      </div>
      <div className="row">
        <TeamInfo 
          name="Adyasha Pattanaik"
          position="Frontend"
        />
      </div>
      </div>
    </div>
  );
}

export default About;
