import { useState, useContext } from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

export default function EditProfile() {

  const userContext = useContext(CurrentUserContext); 
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

    function handleNameChange(e) {
        setName(e.target.value);

    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);

    }

    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateUser({name: name, about: description});
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="popup__form"
        name="profile-form"
        id="edit-profile-form"
        noValidate
      >
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_name"
            id="name"
            maxLength="40"
            minLength="2"
            name="name"
            placeholder="Name"
            required
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__input-error" id="name-error"></span>
        </label>
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_description"
            id="description"
            maxLength="200"
            minLength="2"
            name="description"
            placeholder="About me"
            required
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="popup__input-error" id="description-error"></span>
        </label>
        <button className="button popup__button" type="submit">Salvar</button>
      </form>
    );
}