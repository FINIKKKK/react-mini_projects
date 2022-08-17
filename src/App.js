import React from "react";
import axios from "axios";

import { Success } from "./components/Success";
import { Users } from "./components/Users";

import "./index.scss";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [invites, setInvites] = React.useState([]);

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get("https://reqres.in/api/users");
        setUsers(data.data);
      };
      fetchData();
    } catch (error) {
      alert("Ошибка!");
      console.log("Ошибка при получении пользователей");
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const onInviteUser = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };


  return (
    <div className="App">
      {!success ? (
        <Users
          items={users}
          isLoaded={isLoaded}
          setSuccess={setSuccess}
          invites={invites}
          onInviteUser={onInviteUser}
        />
      ) : (
        <Success
          count={invites.length}
          setinvites={setInvites}
          setSuccess={setSuccess}
        />
      )}
    </div>
  );
}

export default App;
