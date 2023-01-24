import useFetch from "hooks/useFetch";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const MOCK_USER = {
  userName: "dgianni",
  password: "123456",
  group: "Admin",
  avatar: "/logo192.png",
};

const UserContextProvider = ({ children }) => {
  // aca deberia hacer un fetch de la api que me da la info del usuario
  const [currentUser, setCurrentUser] = useState({});
  const { startRequest, requestStatus } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userName") && localStorage.getItem("rolID")) {
      setCurrentUser({
        userName: localStorage.getItem("userName"),
        group: localStorage.getItem("rolID"),
        avatar: localStorage.getItem("avatar"),
      });
    }
  }, []);

  const logIn = async (username, password) => {
    const credentials = { username, password };

    const apiResponse = await startRequest("post", "/api/auth/login", credentials, true);
    console.log(apiResponse);

    if (apiResponse.ok) {
      const newCurrentUser = {};
      newCurrentUser.userName = apiResponse.data.user.username;
      newCurrentUser.group = apiResponse.data.user.roles[0];
      newCurrentUser.avatar = "/logo192.png";
      console.log(newCurrentUser);
      localStorage.setItem("userName", newCurrentUser.userName);
      localStorage.setItem("rolID", newCurrentUser.group);
      localStorage.setItem("avatar", newCurrentUser.avatar);
      setCurrentUser(newCurrentUser);
      navigate("/");
    } else {
    }
  };

  const logOut = () => {
    setCurrentUser({});
    localStorage.removeItem("userName");
    localStorage.removeItem("rolID");
    localStorage.removeItem("avatar");
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logIn,
        logOut,
        requestStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
