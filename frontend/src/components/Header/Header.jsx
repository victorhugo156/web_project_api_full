import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { removeJwtFromLocalStorage } from "../../utils/token";

export function Header() {

  const userContext = useContext(CurrentUserContext);
  const { isLoggedIn, userEmail, setIsLoggedIn, setUserEmail } = userContext;
  const location = useLocation();
  const navigate = useNavigate();


  function handleLogout() {
    removeJwtFromLocalStorage();
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/signin');
  }


  return (
    <header className="header page__section">
      <img alt="Logotipo Around The U.S." className="logo header__logo" src="/images/logo.svg" />
      <div className="header__container">
        {
          isLoggedIn ? (
            <div className="header__user-info">
              <p className="header__text">{userEmail}</p>
              <button onClick={handleLogout} className="header__button">Sair</button>
            </div>) : location.pathname === "/signin" ? (
              <p className="header__text">Entrar</p>
            ) : (
              <p className="header__text">Faça o login</p>
            )
        }

      </div>
    </header>
  );
}