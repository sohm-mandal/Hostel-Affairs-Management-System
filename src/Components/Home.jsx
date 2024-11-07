
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Roomate from "./LandingArea";
import About from "./About";
import Profile from "./Profile";
import HostelInfo from "./HostelInfo";
import WhatsApp from "./WhatsApp";
import TaxiShare from "./TaxiShare";
import LandingPage from "./roommate";
import Mess
from "./Mess";
import Laundry from "./Laundry";

const Home = () => {

  const [currentPage, setCurrentPage]  = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="container" style={{display:'flex', flexDirection:"column", justifyContent:"space-between"}}>
      <div>
        <Navbar onPageChange = {handleNavigation} currentPage={currentPage}/>
      </div>
      <br />
      <div style={{paddingTop:"60px"}}>
      {currentPage === 'home' && <LandingPage onPageChange={handleNavigation}/>}
      {currentPage === "roommate" && <Roomate />}
      {currentPage === "laundry" && <Laundry />}
      {currentPage === "mess" && <Mess />}
      {currentPage === 'profilePage' && <Profile/>}
      {currentPage === 'hostelInfo' && <HostelInfo onPageChange = {handleNavigation}/>}
      {currentPage === 'whatsApp' && <WhatsApp/>}
      {currentPage === 'taxiShare' && <TaxiShare/>}
      {currentPage === "aboutPage" && <About />}
      </div>
    </div>
  );
};

export default Home;

