import { useEffect, useContext } from 'react';
import { Main } from './Main/Main';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from '../utils/api';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { getJwtFromLocalStorage } from '../utils/token';
import { Loader } from './Loader/Loader';
import { setJwtInLocalStorage } from '../utils/token';
import { register, login, getUserInfo } from '../utils/auth';

export function App() {
  const navigate = useNavigate();

  const { 
    isLoading,
    setIsLoading,
    isLoggedIn, 
    setIsLoggedIn, 
    handleOpenPopup,
     handleClosePopup,
     setCurrentUser,
     setUserEmail,
     cards,
     setCards,
     popup,
     handleCardLike,
     handleCardDelete,
     } = useContext(CurrentUserContext);

     function registerUser(event, userData, setTooltip) {

      if(!userData.email || !userData.password){
        setTooltip({
          message: "Um ou mais campos não foram fornecidos",
          isSuccess: false
        })
        return
      }
  
      register(userData.password, userData.email )
      .then(()=>{
        setTooltip({
          message: "Você foi registrado com sucesso! Agora você pode fazer login.",
          isSuccess: true
        })
      }).catch(()=>{
        setTooltip({
          message: "Ops, algo saiu deu errado! Por favor, tente novamente.",
          isSuccess: false
        })
      })

     }


     function loginUser(event, userData, setTooltip) {
  
      if(!userData.email || !userData.password){
        setTooltip({
          message: "Um ou mais campos não foram fornecidos",
          isSuccess: false
        })
        return
      }
  
      login(userData.password, userData.email )
      .then((response)=>{
        setIsLoggedIn(true)
        setJwtInLocalStorage(response.token) // Salva o token no localStorage
        
        api.getUserInfo()
        .then((user) => {
          console.log(user)
          setUserEmail(user.email);
          navigate('/');
        })
        .catch(()=>{
          setTooltip({
            message: "O token fornecido é inválido",
            isSuccess: false
          })
        })
        .finally(() => {
          setIsLoading(false);
        });
  
      }).catch((error)=>{
        setTooltip({
          message: error.message,
          isSuccess: false
        })
      }).finally(() => {
        setIsLoading(false);
      })
    }

  useEffect(() => {
    const token = getJwtFromLocalStorage()
    setIsLoading(true);
    if(!token) {
      setIsLoading(false);
      return;
    }

    getUserInfo(token)
      .then((user) => {
        setIsLoggedIn(true);
        setUserEmail(user.data.email);
        navigate('/');
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  useEffect(() => {

    if(!isLoggedIn){
      return
    }

    api.getUserInfo()
    .then((user) => {
      setCurrentUser(user);
    })
    .catch(err => console.log(err));

    api.getInitialCards().then((cards) => {
      setCards(cards);
    }).catch((error) => console.error(error));
  }, [setCards, setCurrentUser, isLoggedIn]);


  if(isLoading) {
    return <Loader />;
  }

  return (
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route path="/signin" element={<Login onLogin={loginUser} />} />
          <Route path="/signup" element={<Register onRegister={registerUser} />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={
              <Main onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup} popup={popup} cards={cards} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete} />
            } />
          </Route>

        </Route>

        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>


  )
}
