
import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(setPosts);
  };

  useEffect(loadPosts, []);

  const likePost = (id) => {
    fetch("/api/posts/like/" + id, { method: "PUT" })
      .then(loadPosts);
  };

  const commentPost = (id) => {
    const text = prompt("Enter comment");
    fetch("/api/posts/comment/" + id, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text })
    }).then(loadPosts);
  };

  return (
    <div>
      <h1>Advanced Student Blog</h1>
      {posts.map(p => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <p>Likes: {p.likes}</p>
          <button onClick={() => likePost(p._id)}>Like</button>
          <button onClick={() => commentPost(p._id)}>Comment</button>

          <ul>
            {p.comments.map((c,i)=><li key={i}>{c.text}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
