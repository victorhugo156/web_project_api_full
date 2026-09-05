import ImagePopup from "../ImagePopup/ImagePopup";
import RemoveCard from "../RemoveCard/RemoveCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Card({ card, onOpenPopup, handleCardLike, handleCardDelete }) {

  const { name, link } = card;
  const { currentUser } = useContext(CurrentUserContext);
  const ownerID = card.owner?._id ?? card.owner;
  const isOwner = ownerID === currentUser._id;

  const imagePopupConfig = {
    children: <ImagePopup link={link} name={name} />
  };


  const cardLikeButtonClassName = `card__like-button ${card.likes?.some((like )=> (like._id?? like) === currentUser._id) ? 'card__like-button_is-active' : ''
    }`;

  function handleLike() {
    
    handleCardLike(card);
  }
  function handleDelete() {
    const removeCardPopup = {
      title: "Tem certeza?",
      children: <RemoveCard onConfirm={() => handleCardDelete(card)} />
  };
    onOpenPopup(removeCardPopup);
    // handleCardDelete(card);
  }

  return (
    <li className="card">
      <img onClick={() => onOpenPopup(imagePopupConfig)} className="card__image" src={link} alt={name} />

      {
        
        isOwner && (
          <button
            onClick={() => handleDelete()}
            aria-label="Delete card"
            className="card__delete-button"
            type="button"
          />
        )
      }
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          onClick={() => handleLike()}
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
        />
      </div>
    </li>
  );
}