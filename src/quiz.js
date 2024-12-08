import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Quiz = () => {
  const location = useLocation();
  const { state } = location || {};
  const [userData, setUserData] = useState(state || {});
  const navigate = useNavigate();

  // Questions data
  const questions = [
    { 
      id: 1, 
      text: "How does a fresh morning feel to you?", 
      options: [
        { text: "Refreshing", notes: "Earthy, green", feelings: "Invigorating" },
        { text: "Soothing", notes: "Powdery, musky", feelings: "Soothing" },
        { text: "Uplifting", notes: "Warm, gourmand", feelings: "Uplifting" },
        { text: "Exotic", notes: "Smoky, herbal", feelings: "Exotic" }
      ]
    },
    {
      id: 2,
      text: "What do you want to feel like when going out?",
      options: [
        { text: "Bold", notes: "Smoky, herbal", feelings: "Exotic" },
        { text: "Subtle", notes: "Powdery, musky", feelings: "Soothing" },
        { text: "Elegant", notes: "Warm, gourmand", feelings: "Uplifting" },
        { text: "Natural", notes: "Earthy, green", feelings: "Invigorating" }
      ]
    },
      {
        id: 3,
        text: "How do you want your daily perfume to make you feel?",
        options: [
          { text: "Confident", notes: "Woody, spicy", feelings: "Empowering" },
          { text: "Relaxed", notes: "Powdery, musky", feelings: "Calming" },
          { text: "Energetic", notes: "Citrusy, fruity", feelings: "Invigorating" },
          { text: "Comforted", notes: "Vanilla, warm", feelings: "Cozy" }
        ]
      },
      {
        id: 4,
        text: "What inspires you?",
        options: [
          { text: "Nature", notes: "Green, earthy", feelings: "Refreshing" },
          { text: "Luxury", notes: "Rich, oud", feelings: "Sophisticated" },
          { text: "Energy", notes: "Citrusy, zesty", feelings: "Energizing" },
          { text: "Calm", notes: "Lavender, soft woods", feelings: "Tranquil" }
        ]
      },
      {
        id: 5,
        text: "What scent represents the perfect weekend getaway?",
        options: [
          { text: "Rustic", notes: "Woody, smoky", feelings: "Adventurous" },
          { text: "Relaxing", notes: "Aquatic, fresh", feelings: "Calming" },
          { text: "Playful", notes: "Fruity, sweet", feelings: "Cheerful" },
          { text: "Romantic", notes: "Floral, warm", feelings: "Loving" }
        ]
      },
      {
        id: 6,
        text: "What do you imagine when you think of springtime?",
        options: [
          { text: "Blossoms", notes: "Floral, fresh", feelings: "Uplifting" },
          { text: "Rain", notes: "Aquatic, earthy", feelings: "Refreshing" },
          { text: "Sunshine", notes: "Citrusy, warm", feelings: "Energizing" },
          { text: "New Beginnings", notes: "Herbal, green", feelings: "Hopeful" }
        ]
      },
      {
        id: 7,
        text: "What options brings you the most calm emotions?",
        options: [
          { text: "Soothing", notes: "Lavender, chamomile", feelings: "Relaxed" },
          { text: "Fresh", notes: "Herbal, dewy", feelings: "Rejuvenated" },
          { text: "Aromatic", notes: "Eucalyptus, mint", feelings: "Energized" },
          { text: "Earthy", notes: "Mossy, green", feelings: "Grounded" }
        ]
      },
      {
        id: 8,
        text: "What kind of perfume feels luxurious to you?",
        options: [
          { text: "Rich", notes: "Oud, amber", feelings: "Sophisticated" },
          { text: "Elegant", notes: "Floral, musky", feelings: "Graceful" },
          { text: "Unique", notes: "Spicy, smoky", feelings: "Distinctive" },
          { text: "Warm", notes: "Vanilla, sandalwood", feelings: "Comforting" }
        ]
      },
      {
        id: 9,
        text: "What option would wake you up first thing in the morning?",
        options: [
          { text: "Bright", notes: "Citrusy, zesty", feelings: "Energizing" },
          { text: "Tropical", notes: "Fruity, coconutty", feelings: "Playful" },
          { text: "Refreshing", notes: "Aquatic, crisp", feelings: "Invigorating" },
          { text: "Natural", notes: "Green, floral", feelings: "Fresh" }
        ]
      },
      {
        id: 10,
        text: "What is an attractive feature to you?",
        options: [
          { text: "Bold", notes: "Spicy, woody", feelings: "Empowering" },
          { text: "Romantic", notes: "Rose, vanilla", feelings: "Passionate" },
          { text: "Elegant", notes: "Amber, floral", feelings: "Graceful" },
          { text: "Unique", notes: "Smoky, herbal", feelings: "Intriguing" }
        ]
      },
      {
        id: 11,
        text: "Which scent brings back happy memories?",
        options: [
          { text: "Sweet", notes: "Honey, vanilla", feelings: "Nostalgic" },
          { text: "Earthy", notes: "Green, mossy", feelings: "Grounded" },
          { text: "Floral", notes: "Rose, jasmine", feelings: "Romantic" },
          { text: "Fresh", notes: "Herbal, citrusy", feelings: "Cheerful" }
        ]
      },
      {
        id: 12,
        text: "What fragrance embodies energy for you?",
        options: [
          { text: "Zesty", notes: "Citrusy, spicy", feelings: "Invigorating" },
          { text: "Green", notes: "Herbal, fresh", feelings: "Refreshing" },
          { text: "Bold", notes: "Woody, smoky", feelings: "Empowering" },
          { text: "Sweet", notes: "Fruity, gourmand", feelings: "Playful" }
        ]
      },
      {
        id: 13,
        text: "What does the scent of freedom smell like to you?",
        options: [
          { text: "Fresh", notes: "Aquatic, airy", feelings: "Liberating" },
          { text: "Wild", notes: "Woody, herbal", feelings: "Adventurous" },
          { text: "Pure", notes: "Clean, floral", feelings: "Innocent" },
          { text: "Unique", notes: "Smoky, spicy", feelings: "Distinctive" }
        ]
      }
  ];

  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionSelect = (notes, feelings) => {
    const newAnswer = { notes, feelings };
    setAnswers([...answers, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
    const aggregatedNotes = answers.map(a => a.notes).join(", ");
    const aggregatedFeelings = answers.map(a => a.feelings).join(", ");

    console.log("Selected Notes:", aggregatedNotes);
    console.log("Selected Feelings:", aggregatedFeelings);

    try {
        const updatedUserData = {
            ...userData,
            ["notes"]: aggregatedNotes,
            ["feelings"]: aggregatedFeelings
            
            };
        const response1 = await axios.put('http://localhost:5000/users-notes', updatedUserData);
        const response2 = await axios.put('http://localhost:5000/users-feelings', updatedUserData);
        console.log(response1);
        if (response1.status == 200 && response2.status == 200) {
            console.log("Preferences saved successfully!");
            navigate('/homepage', { state: userData });
        } else {
            console.error("Failed to save preferences.");
        }
    } catch (error) {
        console.error("Error saving preferences:", error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Perfume Preference Quiz</h1>
      <div>
        <p>{currentQuestion.text}</p>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option.notes, option.feelings)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};


export default Quiz;
