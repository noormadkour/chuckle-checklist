import "./App.css";
import stevePic from "./assets/steve.png";
import { useState, useEffect } from "react";
import {
  getAllJokes,
  submitJoke,
  editJoke,
  deleteJoke,
} from "./services/jokeService";

export const App = () => {

  const getJokes = () => {
    getAllJokes().then((jokesArray) => setAllJokes(jokesArray));
  };

  const [userInput, setUserInput] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
    });
  }, []);

  useEffect(() => {
    setToldJokes(allJokes.filter((joke) => joke.told === true));
    setUntoldJokes(allJokes.filter((joke) => joke.told === false));
  }, [allJokes]);

  const handleToggleJoke = (joke) => {
    joke.told = !joke.told;
    editJoke(joke).then(() => getJokes());
  };

  const handleDeleteJoke = (joke) => {
    deleteJoke(joke).then(() => getJokes());
  }

  return (
    <>
      <div className="app-container">
        <div className="app-heading">
          <div className="app-heading-circle">
            <img className="app-logo" src={stevePic} alt="Good job Steve" />
          </div>
          <h1 className="app-heading-text">Chuckle List</h1>
        </div>
        <div>
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
              onClick={async () => {
                if (userInput !== "") {
                  await submitJoke(userInput);
                  setUserInput("");
                  await getJokes(); // Wait for submitJoke and getJokes to complete
                } else {
                  window.alert("No empty strings please");
                }
              }}
            >
              Submit Your Corny-Ass Joke
            </button>
          </div>
        </div>
        <div className="joke-lists-container">
          <div className="joke-list-container">
            <h2>
              <i className="fa-regular fa-face-meh face-emoji"></i>
              Untold Jokes
              <span className="untold-count">{untoldJokes.length}</span>
            </h2>
            {untoldJokes.map((joke) => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <button 
                    className="button-delete"
                    onClick={() => handleDeleteJoke(joke)}
                  >
                    <i className="fa-regular fa-trash"/>
                  </button>
                  <button
                    className="button-emoji"
                    value={joke.id}
                    onClick={() => handleToggleJoke(joke)}
                  >
                    <i className="fa-regular fa-face-meh" />
                  </button>
                </li>
              );
            })}
          </div>
          <div className="joke-list-container">
            <h2>
              <i className="fa-regular fa-face-grin-squint face-emoji"></i>
              Told Jokes
              <span className="told-count">{toldJokes.length}</span>
            </h2>
            {toldJokes.map((joke) => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <button 
                    className="button-delete"
                    onClick={() => handleDeleteJoke(joke)}
                  >
                    <i className="fa-regular fa-trash"/>
                  </button>
                  <button
                    className="button-emoji"
                    onClick={() => handleToggleJoke(joke)}
                  >
                    <i className="fa-regular fa-face-grin-squint" />
                  </button>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
