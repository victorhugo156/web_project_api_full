export default function ImagePopup({ name, link }) {

    return (
        <>
            <img className="popup__image" src={link} alt={name} />
            <p className="popup__caption">{name}</p>
        </>

    );
}