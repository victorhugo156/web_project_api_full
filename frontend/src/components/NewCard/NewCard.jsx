import { useState, useContext } from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

export default function NewCard() {
    const userContext = useContext(CurrentUserContext);
    const { handleAddPlaceSubmit } = userContext;

    const [cardName, setCardName] = useState('');
    const [cardLink, setCardLink] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        handleAddPlaceSubmit({name: cardName, link: cardLink});
    }

    return (
      <form
      onSubmit={handleSubmit}
        className="popup__form"
        name="card-form"
        id="new-card-form"
        noValidate
      >
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_card-name"
            id="card-name"
            maxLength="30"
            minLength="1"
            name="card-name"
            placeholder="Title"
            required
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <span className="popup__error" id="card-name-error"></span>
        </label>
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_url"
            id="card-link"
            name="link"
            placeholder="Image link"
            required
            type="url"
            value={cardLink}
            onChange={(e) => setCardLink(e.target.value)}
          />
          <span className="popup__error" id="card-link-error"></span>
        </label>
  
        <button className="button popup__button" type="submit">
          Salvar
        </button>
      </form>
    );
  }