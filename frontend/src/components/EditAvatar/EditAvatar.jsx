import { useState, useRef, useContext } from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

export default function EditAvatar() {
  const userContext = useContext(CurrentUserContext);
  const { handleUpdateAvatar } = userContext;

    const [avatar, setAvatar] = useState('');
    const avatarInput = useRef(null);
    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateAvatar(avatarInput.current.value);
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="popup__form"
        name="avatar-form"
        id="edit-avatar-form"
      >
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_avatar"
            id="avatar"
            name="avatar"
            placeholder="Avatar link"
            required
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            ref={avatarInput}
          />
          <span className="popup__input-error" id="avatar-error"></span>
        </label>
        <button className="button popup__button" type="submit">Salvar</button>
      </form>
    );
}