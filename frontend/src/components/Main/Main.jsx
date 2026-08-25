import { useContext } from 'react';
import Popup from '../Popup/Popup';
import NewCard from '../NewCard/NewCard';
import Card from '../Card/Card';
import EditProfile from '../EditProfile/EditProfile';
import EditAvatar from '../EditAvatar/EditAvatar';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export function Main({ onOpenPopup, onClosePopup, popup, cards, handleCardLike, handleCardDelete, handleAddPlaceSubmit }) {

  const newCardPopup = { title: "New card", children: <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} /> };
  const editProfilePopup = { title: "Edit profile", children: <EditProfile /> };
  const editAvatarPopup = { title: "Edit avatar", children: <EditAvatar /> };


  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__section">
        <button onClick={() => onOpenPopup(editAvatarPopup)} className="profile__avatar-button">
          <div className="profile__edit-icon-container">
            <img className="profile__edit-icon" src="/images/edit-icon.svg" alt="Edit avatar" />
          </div>
          <img className="profile__image" src={currentUser.avatar} alt="Avatar" />

        </button>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button onClick={() => onOpenPopup(editProfilePopup)} aria-label="Editar perfil" className="profile__edit-button" type="button"></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button onClick={() => onOpenPopup(newCardPopup)} aria-label="Adicionar cartão" className="profile__add-button" type="button"></button>
      </section>


      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onOpenPopup={onOpenPopup} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete} />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

    </main>
  );
}