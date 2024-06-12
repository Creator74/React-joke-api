import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function JokeUi() {
  const [count, setCount] = useState(0);
  const [post, setPost] = useState(null);
  const baseURL = "https://v2.jokeapi.dev/joke/Programming";
  const [isCallInProgress, setIsCallInProgress] = useState(false);

  //useEffect(fetchData, []);

  //useEffect(() => {console.log("Hello",post)},[post])
  function checkForCall() {
    if (!isCallInProgress) {
      fetchData();
    }
  }

  function fetchData() {
    if (isCallInProgress) return;
    setIsCallInProgress(true);
    axios.get(baseURL).then((response) => {
      console.log(response);
      setPost(response.data);
      console.log(response.data);
      setIsCallInProgress(false);
    });
    //if (!post) return null;
  }
  console.log("post:", post);
  return (
    <div>
      <button
        onClick={fetchData}
        type="button"
        disabled={isCallInProgress ? true : false}
      >
        Click Me For Data
      </button>
      {post != null &&
        (post.type === "single" ? (
          <h2>{post.joke}</h2>
        ) : (
          <h2>
            {post.setup}, {post.delivery}
          </h2>
        ))}
    </div>
  );
}

function MyForm() {
  const [numApiCalls, setNumApiCalls] = useState(0);
  console.log(numApiCalls);
  const [data, setData] = useState([]);
  const [areCallsInProgress, setAreCallsInProgress] = useState(false);
  const [error, setError] = useState(null);

  async function fetchJokeData() {
    setAreCallsInProgress(true);
    const urls = [];
    for (let i = 1; i <= numApiCalls; i++) {
      urls.push(
        "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
      );
    }
    console.log(urls);
    try {
      const requests = urls.map((url) => axios.get(url));
      const responses = await Promise.all(requests);
      const results = responses.map((response) => response.data);
      console.log(results);
      setData(results);
      setAreCallsInProgress(false);
    } catch (err) {
      setError(err);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`The number you entered was: ${numApiCalls}`);
    fetchJokeData();
  };
  console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Number :
          <input
            type="number"
            value={numApiCalls}
            onChange={(e) => setNumApiCalls(e.target.value)}
            disabled={areCallsInProgress ? true : false}
          />
        </label>
        <button type="submit" disabled={areCallsInProgress ? true : false}>
          Submit
        </button>
      </form>

      <div className="loading-text">
        {areCallsInProgress
          ?<p>Constructing jokes...</p>
          : data.map((value, index) => (
              <div key={index} className="joke-container">
                {value.type === "single" ? (
                  value.joke
                ) : (
                  <>
                    <div>{value.setup}</div>
                    <div>{value.delivery}</div>
                  </>
                )}
                {index < data.length - 1 && <hr />}
              </div>
            ))}
      </div>
    </div>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>My First React Page</h1>
      {/* <JokeUi /> */}
      <MyForm />
    </div>
  );
}
