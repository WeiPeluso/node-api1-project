import React, { useState } from "react";
import axios from "axios";

const UserCard = (props) => {
  const [editUser, setEditUser] = useState({
    name: props.user.name,
    bio: props.user.bio,
  });
  const [editToggle, setEditToggle] = useState(false);
  const editUserButton = (e) => {
    e.preventDefault();
    setEditToggle(true);
  };
  const userEditChange = (e) => {
    e.preventDefault();
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    axios
      .put(`http://localhost:3000/api/users/${props.user.id}`, editUser)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditToggle(false);
        props.setRefresh(!props.refresh);
      });
  };
  const cancelEdit = (e) => {
    setEditToggle(false);
  };
  const deleteUser = (e) => {
    axios
      .delete(`http://localhost:3000/api/users/${props.user.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        props.setRefresh(!props.refresh);
      });
  };
  return (
    <>
      {editToggle ? (
        <>
          <form className="form" onSubmit={onSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editUser.name}
              onChange={userEditChange}
            />
            <label>bio:</label>
            <input
              type="text"
              name="bio"
              value={editUser.bio}
              onChange={userEditChange}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>
          <p>{props.user.name}</p>
          <p>{props.user.bio}</p>
          <button onClick={editUserButton}>Edit</button>
          <button onClick={deleteUser}>Delete</button>
        </>
      )}
    </>
  );
};

export default UserCard;
