import authChecked from "../../images/auth-checked.png";
import authFailed from "../../images/auth-invalid.png";

export function InfoTooltip({message, isSuccess, onClose}){

    function handleCloseTooltip(){
        onClose()
    }
    return(
        <div className="popup" onClick={handleCloseTooltip}>
        <div className="popup__content popup__content_type_info-tooltip">
          <button
            aria-label="Close modal"
            className="popup__close"
            type="button"
            onClick={onClose}
          />
          <img src={isSuccess ? authChecked : authFailed} alt="Icone de sucesso" className="popup__icon" />

           <h3 className="popup__title popup__title_type_info-tooltip">{message}</h3>
        </div>
      </div>
    )
}