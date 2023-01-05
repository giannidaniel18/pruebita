import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const MOCK_USER = {
  userName: "dgianni",
  group: "Admin",
  avatar:
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Round&hairColor=Brown&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Black&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Pale",
};

const UserContextProvider = ({ children }) => {
  // aca deberia hacer un fetch de la api que me da la info del usuario
  const [currentUser, setCurrentUser] = useState(MOCK_USER);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
