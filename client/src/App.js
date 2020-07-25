import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import UserCard from "./components/UserCard";

function App() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState({ name: "", bio: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const userInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    axios
      .post("http://localhost:3000/api/users", user)
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1>Users Page</h1>
      <h2> Add a User</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={userInputChange}
        />
        <label>bio:</label>
        <input
          type="text"
          name="bio"
          value={user.bio}
          onChange={userInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="userlist">
        {users.map((user) => {
          return (
            <UserCard
              key={user.id}
              user={user}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
