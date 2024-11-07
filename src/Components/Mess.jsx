import React, { useState } from "react";
import Character from '../images/Screenshot 2024-04-18 at 9.03.03 AM.png';
import "./mess.css"; 
import { getApp } from "firebase/app";
function Mess() {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCaterer, setSelectedCaterer] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const catererMenus = {
    "Darling Mess": {
      Monday: {
        breakfast: "Pancakes, Fruit Salad, Coffee",
        lunch: "Pasta, Caesar Salad, Garlic Bread",
        snacks: "Brownies, Tea, Cookies",
        dinner: "Grilled Chicken, Rice, Veggies",
      },
      Tuesday: {
        breakfast: "Omelette, Toast, Orange Juice",
        lunch: "Chicken Biryani, Raita, Papad",
        snacks: "Samosa, Chai",
        dinner: "Fish Curry, Steamed Rice, Salad",
      },
      Wednesday: {
        breakfast: "French Toast, Berries, Milk",
        lunch: "Paneer Butter Masala, Naan, Rice",
        snacks: "Muffins, Lemonade",
        dinner: "Beef Stir Fry, Noodles, Spring Rolls",
      },
      Thursday: {
        breakfast: "Eggs, Toast, Orange Juice",
        lunch: "Chicken Tikka, Naan, Rice",
        snacks: "Samosa, Chai",
        dinner: "Fish Fry, Steamed Rice, Salad",
      },
      Friday: {
        breakfast: "Poha, Jalebi, Lemonade",
        lunch: "Paneer Butter Masala, Naan, Rice",
        snacks: "Muffins, Lemonade",
        dinner: "Beef Stir Fry, Noodles, Spring Rolls",
      },
      Saturday: {
        breakfast: "Pancakes, Fresh Fruits, Coffee",
        lunch: "Veg Biryani, Raita, Papad",
        snacks: "Cakes, Lemonade",
        dinner: "Chicken Tikka Masala, Naan, Rice",
      },
      Sunday: {
        breakfast: "Omelette, Toast, Orange Juice",
        lunch: "Beef Biryani, Raita, Papad",
        snacks: "Muffins, Lemonade",
        dinner: "Fish Curry, Steamed Rice, Salad",
      },
    },
    "PR Mess": {
      Monday: {
        breakfast: "Idli, Coconut Chutney, Filter Coffee",
        lunch: "Paneer Tikka, Naan, Dal Makhani",
        snacks: "Pakoras, Lemonade",
        dinner: "Mutton Rogan Josh, Rice, Pickle",
      },
      Tuesday: {
        breakfast: "Uttapam, Sambhar, Chutney",
        lunch: "Veg Kofta, Jeera Rice, Roti",
        snacks: "Cheese Balls, Soda",
        dinner: "Butter Chicken, Naan, Salad",
      },
      Wednesday: {
        breakfast: "Veg Omelette, Toast, Orange Juice",
        lunch: "Veg Biryani, Raita, Papad",
        snacks: "Muffins, Lemonade",
        dinner: "Veg Korma, Rice, Roti",
      },
      Thursday: {
        breakfast: "Pancakes, Fresh Fruits, Coffee",
        lunch: "Veg Tikka Masala, Naan, Rice",
        snacks: "Cheese Balls, Soda",
        dinner: "Veg Jalfrezi, Rice, Roti",
      },
      Friday: {
        breakfast: "Idli, Coconut Chutney, Filter Coffee",
        lunch: "Veg Kofta, Jeera Rice, Roti",
        snacks: "Pakoras, Lemonade",
        dinner: "Veg Makhani, Rice, Naan",
      },
      Saturday: {
        breakfast: "Uttapam, Sambhar, Chutney",
        lunch: "Veg Pulao, Raita, Mixed Veg",
        snacks: "Fruit Chaat, Coconut Ladoo",
        dinner: "Veg Biryani, Raita, Papad",
      },
      Sunday: {
        breakfast: "Paratha, Yogurt, Pickle",
        lunch: "Chole Bhature, Green Chutney",
        snacks: "Cornflakes, Milk",
        dinner: "Dal Tadka, Rice, Papad",
      },
    },
    "Zenith Mess": {
      Monday: {
        breakfast: "Vegetable Upma, Tea",
        lunch: "Veg Pulao, Raita, Mixed Veg",
        snacks: "Fruit Chaat, Coconut Ladoo",
        dinner: "Aloo Gobi, Roti, Salad",
      },
      Tuesday: {
        breakfast: "Paratha, Yogurt, Pickle",
        lunch: "Chole Bhature, Green Chutney",
        snacks: "Cornflakes, Milk",
        dinner: "Dal Tadka, Rice, Papad",
      },
      Wednesday: {
        breakfast: "Poha, Jalebi, Tea",
        lunch: "Rajma Chawal, Chutney",
        snacks: "Bhel Puri, Juice",
        dinner: "Palak Paneer, Rice, Roti",
      },
      Thursday: {
        breakfast: "Vegetable Upma, Tea",
        lunch: "Veg Pulao, Raita, Mixed Veg",
        snacks: "Fruit Chaat, Coconut Ladoo",
        dinner: "Aloo Gobi, Roti, Salad",
      },
      Friday: {
        breakfast: "Pancakes, Fresh Fruits, Coffee",
        lunch: "Veg Tikka Masala, Naan, Rice",
        snacks: "Cheese Balls, Soda",
        dinner: "Veg Makhani, Rice, Naan",
      },
      Saturday: {
        breakfast: "Uttapam, Sambhar, Chutney",
        lunch: "Veg Kofta, Jeera Rice, Roti",
        snacks: "Pakoras, Lemonade",
        dinner: "Veg Jalfrezi, Rice, Roti",
      },
      Sunday: {
        breakfast: "Idli, Coconut Chutney, Filter Coffee",
        lunch: "Veg Biryani, Raita, Papad",
        snacks: "Muffins, Lemonade",
        dinner: "Veg Rogan Josh, Rice, Naan",
      },
    },
  };

  const menuDetails = {
    "Veg Mess": {
      Monday: {
        breakfast: "Vegetable Upma, Tea",
        lunch: "Veg Pulao, Raita, Mixed Veg",
        snacks: "Fruit Chaat, Coconut Ladoo",
        dinner: "Aloo Gobi, Roti, Salad",
      },
      Tuesday: {
        breakfast: "Poha, Jalebi, Tea",
        lunch: "Rajma Chawal, Chutney",
        snacks: "Bhel Puri, Juice",
        dinner: "Palak Paneer, Rice, Roti",
      },
      Wednesday: {
        breakfast: "Samosas, Chutney, Tea",
        lunch: "Veg Korma, Rice, Naan",
        snacks: "Kachoris, Soda",
        dinner: "Veg Jalfrezi, Roti, Salad",
      },
      Thursday: {
        breakfast: "Dosa, Sambhar, Chutney",
        lunch: "Veg Tikka Masala, Jeera Rice, Roti",
        snacks: "Bhel Puri, Lemonade",
        dinner: "Veg Makhani, Rice, Naan",
      },
      Friday: {
        breakfast: "Idli, Coconut Chutney, Filter Coffee",
        lunch: "Veg Kofta, Jeera Rice, Roti",
        snacks: "Pakoras, Lemonade",
        dinner: "Veg Biryani, Raita, Papad",
      },
      Saturday: {
        breakfast: "Uttapam, Sambhar, Chutney",
        lunch: "Veg Pulao, Raita, Mixed Veg",
        snacks: "Fruit Chaat, Coconut Ladoo",
        dinner: "Veg Tawa, Rice, Papad",
      },
      Sunday: {
        breakfast: "Paratha, Yogurt, Pickle",
        lunch: "Chole Bhature, Green Chutney",
        snacks: "Cornflakes, Milk",
        dinner: "Dal Tadka, Rice, Papad",
      },
    },
    "Non-Veg Mess": {
      Monday: {
        breakfast: "Egg Bhurji, Toast, Coffee",
        lunch: "Chicken Curry, Rice, Salad",
        snacks: "Fish Fry, Green Chutney",
        dinner: "Mutton Biryani, Raita",
      },
      Tuesday: {
        breakfast: "Chicken Sausage, Bread, Juice",
        lunch: "Prawn Curry, Rice, Veg",
        snacks: "Chicken Nuggets, Sauce",
        dinner: "Beef Stew, Bread, Salad",
      },
      Wednesday: {
        breakfast: "Samosas, Chutney, Tea",
        lunch: "Veg Korma, Rice, Naan",
        snacks: "Misal Pav, Chaas",
        dinner: "Veg Jalfrezi, Rice, Roti",
      },
      Thursday: {
        breakfast: "Poha, Jalebi, Tea",
        lunch: "Veg Tikka Masala, Naan, Rice",
        snacks: "Cheese Balls, Soda",
        dinner: "Veg Makhani, Rice, Naan",
      },
      Friday: {
        breakfast: "Idli, Coconut Chutney, Filter Coffee",
        lunch: "Veg Kofta, Jeera Rice, Roti",
        snacks: "Pakoras, Lemonade",
        dinner: "Veg Biryani, Raita, Papad",
      },
      Saturday: {
        breakfast: "Uttapam, Sambhar, Chutney",
        lunch: "Veg Pulao, Raita, Mixed Veg",
        snacks: "Fruit Chaat, Coconut Ladoo",
        dinner: "Veg Biryani, Raita, Papad",
      },
      Sunday: {
        breakfast: "Paratha, Yogurt, Pickle",
        lunch: "Chole Bhature, Green Chutney",
        snacks: "Cornflakes, Milk",
        dinner: "Dal Tadka, Rice, Papad",
    },
  },
    "Special Mess": {
      Monday: {
        breakfast: "Avocado Toast, Smoothie",
        lunch: "Grilled Veg Sandwich, Soup",
        snacks: "Mini Tacos, Guacamole",
        dinner: "Lobster Pasta, Garlic Bread",
      },
      Tuesday: {
        breakfast: "Pancake Stack, Syrup, Milkshake",
        lunch: "Sushi Platter, Wasabi, Soy Sauce",
        snacks: "Bruschetta, Lemonade",
        dinner: "Steak, Mashed Potatoes, Veggies",
      },
      Wednesday: {
        breakfast: "Samosas, Chutney, Tea",
        lunch: "Veg Korma, Rice, Naan",
        snacks: "Kachoris, Soda",
        dinner: "Veg Jalfrezi, Roti, Salad",
      },
      Thursday: {
        breakfast: "Dosa, Sambhar, Chutney",
        lunch: "Veg Tikka Masala, Jeera Rice, Roti",
        snacks: "Bhel Puri, Lemonade",
        dinner: "Veg Makhani, Rice, Naan",
      },
      Friday: {
        breakfast: "Idli, Coconut Chutney, Filter Coffee",
        lunch: "Veg Kofta, Jeera Rice, Roti",
        snacks: "Pakoras, Lemonade",
        dinner: "Veg Biryani, Raita, Papad",
      },
      Saturday: {
        breakfast: "Uttapam, Sambhar, Chutney",
        lunch: "Veg Pulao, Raita, Mixed Veg",
        snacks: "Fruit Chaat, Coconut Ladoo",
        dinner: "Veg Tawa, Rice, Papad",
      },
      Sunday: {
        breakfast: "Paratha, Yogurt, Pickle",
        lunch: "Chole Bhature, Green Chutney",
        snacks: "Cornflakes, Milk",
        dinner: "Dal Tadka, Rice, Papad",
      },
    },
  };

  const handleHostelClick = (hostel) => {
    setSelectedHostel(hostel);
    setSelectedOption(null);
    setSelectedCaterer("");
    setSelectedMenu("");
    setSelectedDay("");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedCaterer("");
    setSelectedMenu("");
    setSelectedDay("");
  };

  const handleCatererChange = (event) => {
    setSelectedCaterer(event.target.value);
  };

  const handleMenuChange = (event) => {
    setSelectedMenu(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  return (
    <div className="dropdown" style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Mess Management</h2>
        <img src={Character} alt="Character" style={styles.image} />
      </div>

      <h2 style={styles.sectionTitle}>Select Hostel</h2>
      <div className="dropdown-buttons" style={styles.buttonContainer}>
        <button onClick={() => handleHostelClick("Men's Hostel")} className={selectedHostel === "Men's Hostel" ? "highlighted" : ""} style={styles.button}>
          Men's Hostel
        </button>
        <button onClick={() => handleHostelClick("Ladies Hostel")} className={selectedHostel === "Ladies Hostel" ? "highlighted" : ""} style={styles.button}>
          Ladies Hostel
        </button>
      </div>

      {selectedHostel && (
        <>
          <h2 style={styles.sectionTitle}>Options</h2>
          <div className="dropdown-buttons" style={styles.buttonContainer}>
            <button onClick={() => handleOptionClick("Select Caterer")} className={selectedOption === "Select Caterer" ? "highlighted" : ""} style={styles.button}>
              Select Caterer
            </button>
            <button onClick={() => handleOptionClick("View Menu")} className={selectedOption === "View Menu" ? "highlighted" : ""} style={styles.button}>
              View Menu
            </button>
          </div>
        </>
      )}

      {selectedOption === "Select Caterer" && (
        <>
          <h2 style={styles.sectionTitle}>Select Caterer</h2>
          <select value={selectedCaterer} onChange={handleCatererChange} style={styles.select}>
          <option value="" disabled>Choose a Caterer</option>
            <option value="Darling Mess">Darling Mess</option>
            <option value="PR Mess">PR Mess</option>
            <option value="Zenith Mess">Zenith Mess</option>
          </select>

          {selectedCaterer && (
            <>
              <h2 style={styles.sectionTitle}>Select Day</h2>
              <select value={selectedDay} onChange={handleDayChange} style={styles.select}>
              <option value="" disabled>Select a Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>

              {selectedDay && catererMenus[selectedCaterer][selectedDay] && (
                <div className="menu-display" style={styles.menuDisplay}>
                  <h2>{selectedCaterer} Menu for {selectedDay}</h2>
                  <p><strong>Breakfast:</strong> {catererMenus[selectedCaterer][selectedDay].breakfast}</p>
                  <p><strong>Lunch:</strong> {catererMenus[selectedCaterer][selectedDay].lunch}</p>
                  <p><strong>Snacks:</strong> {catererMenus[selectedCaterer][selectedDay].snacks}</p>
                  <p><strong>Dinner:</strong> {catererMenus[selectedCaterer][selectedDay].dinner}</p>
                </div>
              )}
            </>
          )}
        </>
      )}

      {selectedOption === "View Menu" && (
        <>
          <h2 style={styles.sectionTitle}>View Menu</h2>
          <select value={selectedMenu} onChange={handleMenuChange} style={styles.select}>
            <option value="" disabled>Choose a Menu</option>
            <option value="Veg Mess">Veg Mess</option>
            <option value="Non-Veg Mess">Non-Veg Mess</option>
            <option value="Special Mess">Special Mess</option>
          </select>

          {selectedMenu && (
            <>
              <h2 style={styles.sectionTitle}>Select Day</h2>
              <select value={selectedDay} onChange={handleDayChange} style={styles.select}>
              <option value="" disabled>Select a Day</option>
                 <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>

              {selectedDay && menuDetails[selectedMenu][selectedDay] && (
                <div className="menu-display" style={styles.menuDisplay}>
                  <h2>{selectedMenu} Menu for {selectedDay}</h2>
                  <p><strong>Breakfast:</strong> {menuDetails[selectedMenu][selectedDay].breakfast}</p>
                  <p><strong>Lunch:</strong> {menuDetails[selectedMenu][selectedDay].lunch}</p>
                  <p><strong>Snacks:</strong> {menuDetails[selectedMenu][selectedDay].snacks}</p>
                  <p><strong>Dinner:</strong> {menuDetails[selectedMenu][selectedDay].dinner}</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  highlighted: {
    backgroundColor: "#5199EB",
    color: "white",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  header: {
    backgroundColor: '#5199EB',
    height: "200px",
    width: "60vw",
    borderRadius: '20px',
    display: 'flex',
    flexDirection: "row",
    padding: "0 55px",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: "30px",
    color: "white",
    textAlign: 'center',
    flexBasis: '80%',
  },
  image: {
    height: "200px",
  },
  sectionTitle: {
    margin: "20px 0",
    fontSize: "24px",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    
  },
  button: {
    backgroundColor: "white",
    color: "black",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    width: "250px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  menuDisplay: {
    marginTop: "20px",
    backgroundColor: "#f1f1f1",
    padding: "20px",
    borderRadius: "10px",
    width: "80%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  }
};

export default Mess;


