import { useState } from "react";
import { Link } from "react-router-dom";
import { InfoTooltip } from "../InfoTooltip/InfoTooltip";

export function Login({ onLogin }) {
  const [tooltip, setTooltip] = useState(null)

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleCloseTooltip() {

      setTooltip(null)
      setUserData({
        email: "",
        password: ""
      })
  }

  function handleLoginSubmit(event) {
    event.preventDefault()
    onLogin(event, userData, setTooltip)
  }

  return (
    <div className="content form-auth__container">
      {tooltip && <InfoTooltip message={tooltip.message} isSuccess={tooltip.isSuccess} onClose={handleCloseTooltip} />}
      <form
        onSubmit={handleLoginSubmit}
        className="form-auth__form"
        name="form-auth-form"
        id="form-auth-form"
        noValidate
      >
        <h2 className="form-auth_title">Entrar</h2>
        <label className="form-auth__field">
          <input
            className="form-auth__input"
            id="email"
            maxLength="30"
            minLength="1"
            name="email"
            placeholder="E-email"
            required
            type="email"
            value={userData.email}
            onChange={handleChange}
          />
          <span className="popup__error" id="card-name-error"></span>
        </label>
        <label className="form-auth__field">
          <input
            className="form-auth__input"
            id="password"
            name="password"
            placeholder="Senha"
            required
            type="password"
            value={userData.password}
            onChange={handleChange}
          />
          <span className="popup__error" id="card-link-error"></span>
        </label>

        <button className="button form-auth__button" type="submit">
          Entrar
        </button>
        <div className="form-auth__link-container">
          <p className="form-auth__text">Ainda não é membro?</p>
          <Link to="/signup" className="form-auth__link">Inscreva-se aqui!</Link>
        </div>
      </form>

    </div>

  )
}