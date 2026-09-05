import { createContext } from "react";
import { useState } from "react";
import { api } from "../utils/api";

export const CurrentUserContext = createContext();

export function CurrentUserContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [popup, setPopup] = useState(null);
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function handleUpdateUser(data) {
        (async () => {
          await api.updateUserInfo(data.name, data.about).then((newData) => {
            setCurrentUser(newData);
            handleClosePopup();
          });
        })();
      };



      async function handleCardLike(card) {

        const isLiked = card.likes?.some(
          (like) => (like._id ?? like) === currentUser._id
        );
    
        await api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
          setCards((element) => element.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
        }).catch((error) => console.error(error));
      }
    
      async function handleCardDelete(card) {
        await api.deleteCard(card._id).then(() => {
          setCards((element) => element.filter((element) => element._id !== card._id));
          handleClosePopup();
        }).catch((error) => console.error(error));
      }
    
      async function handleAddPlaceSubmit(data) {
        await api.addNewCard(data.name, data.link).then((newCard) => {
          setCards((element) => [newCard, ...element]);
          handleClosePopup();
        }).catch((error) => console.error(error));
      }
    
      function handleClosePopup() {
        setPopup(null);
      }
    
      function handleOpenPopup(popup) {
        setPopup(popup);
      }
    
      function handleUpdateAvatar(avatar) {
        (async () => {
          await api.updateUserAvatar(avatar).then((newData) => {
            setCurrentUser(newData);
            handleClosePopup();
          });
        })();
      }


    return(
        <CurrentUserContext.Provider value={
            {
              isLoading,
              setIsLoading,
            isLoggedIn, 
            setIsLoggedIn, 
            handleUpdateUser, 
            handleOpenPopup, 
            handleUpdateAvatar,
            handleAddPlaceSubmit,
            handleCardDelete,
            handleCardLike,
            currentUser,
            setCurrentUser,
            userEmail,
            setUserEmail,
            cards,
            setCards,
            popup,
            setPopup,
            handleClosePopup,
            }
        }>
            {children}
        </CurrentUserContext.Provider>
    )
}
