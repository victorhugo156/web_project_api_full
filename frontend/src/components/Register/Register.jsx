import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { InfoTooltip } from "../InfoTooltip/InfoTooltip";

export function Register({ onRegister }) {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [tooltip, setTooltip] = useState(null)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleCloseTooltip() {
    if(tooltip.isSuccess){
      navigate("/signin") // Redireciona para a página de login se o registro foi bem-sucedido
    }
    else{
      setUserData({
        email: "",
        password: ""
      })
    }
    setTooltip(null)
  }

  function handleRegisterSubmit(event) {
    event.preventDefault()
    onRegister(event, userData, setTooltip)
  }

  return (

    <div className="content form-auth__container">

      {tooltip && <InfoTooltip message={tooltip.message} isSuccess={tooltip.isSuccess} onClose={handleCloseTooltip} />}
      <form
        onSubmit={handleRegisterSubmit}
        className="form-auth__form"
        name="form-auth-form"
        id="form-auth-form"
        noValidate
      >
        <h2 className="form-auth_title">Inscrever-se</h2>
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
        Inscrever-se
        </button>
        <div className="form-auth__link-container">
          <p className="form-auth__text">Já é um membro?</p>
          <Link to="/signin" className="form-auth__link">Faça o login aqui!</Link>
        </div>
      </form>

    </div>
  )
} 