import { useState, useEffect } from "react";
import "./App.css";
import { getAllJokes } from "./services/jokeService";

export const App = () => {
  const [userInput, setUserInput] = useState("");

  const submitJoke = async () => {
    const jokeObject = {
      text: userInput,
      told: false,
    };
    
    try {
      const response = await fetch('http://localhost:8088/jokes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jokeObject)
      });

      if (response.ok) {
        console.log('Joke submitted successfully');
        // You can reset the userInput state here if needed
        setUserInput('');
      } else {
        console.error('Failed to submit joke');
      }
    } catch (error) {
      console.error('Error submitting joke:', error);
    }
  };


  return (
    <div>
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle List</h1>
        <h2>Add Joke</h2>
        <div className="joke-add-form">
          <input
            className="joke-input"
            type="text"
            value={userInput}
            placeholder="New One Liner"
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
          />
          <button
            className="joke-input-submit"
            onClick={userInput ? submitJoke : null}
          >
            Submit Your Corny-Ass Joke
          </button>
        </div>
      </div>
    </div>
  );
};
