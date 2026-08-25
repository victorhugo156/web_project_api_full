import { useEffect, useCallback} from 'react';

export default function Popup(props) {
    const { onClose, title, children } = props;

    const handleEscClose = useCallback((e) => {
      if (e.key === 'Escape') {
          onClose();
      }
    }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [handleEscClose]);

    const handleClickOverlayClose = useCallback((e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }, [onClose]);

    return (
      <div className="popup" onClick={handleClickOverlayClose}>
        <div className={`popup__content ${!title ? "popup__content_content_image" : ""}`} >
          <button
            aria-label="Close modal"
            className="popup__close"
            type="button"
            onClick={onClose}
          />
           {title && <h3 className="popup__title">{title}</h3>}
          {children}
        </div>
      </div>
    );
  }