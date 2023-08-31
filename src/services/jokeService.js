export const getAllJokes = () => {
  return fetch(`http://localhost:8088/jokes`).then((res) => res.json());
};

export const submitJoke = async (userInput) => {
  const jokeObject = {
    text: userInput,
    told: false,
  };

  try {
    const response = await fetch("http://localhost:8088/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeObject),
    });

    if (response.ok) {
      console.log("Joke submitted successfully");
    } else {
      console.error("Failed to submit joke");
    }
  } catch (error) {
    console.error("Error submitting joke:", error);
  }
};


export const editJoke = async (joke) => {

  try {
    const response = await fetch(`http://localhost:8088/jokes/${joke.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joke),
    });

    if (response.ok) {
      console.log("Joke edited successfully");
    } else {
      console.error("Failed to edit joke");
    }
  } catch (error) {
    console.error("Error editing joke:", error);
  }
};

export const deleteJoke = async(joke) => {

  try {
    const response = await fetch(`http://localhost:8088/jokes/${joke.id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      console.log("Joke deleted successfully");
    } else {
      console.error("Failed to delete joke");
    }
  } catch (error) {
    console.error("Error deleting joke:", error);
  }
};
