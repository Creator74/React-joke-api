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
      {post != null && (post.flags.nsfw === false?fetchData():(post.type === "single"?(<h2>{post.joke}</h2>):(<h2>{post.setup},{post.delivery}</h2>)))}
      {/* {post != null &&
        (post.type === "single" ? (
          <h2>{post.joke}</h2>
        ) : (
          <h2>
            {post.setup}, {post.delivery}
          </h2>
        ))} */}
    </div>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>My First React Page</h1>
      <JokeUi />
    </div>
  );
}
