

export default function RemoveCard({ onConfirm }) {
    
function handleConfirm() {
    onConfirm()
}
    return (
        <button className="button popup__button" type="button" onClick={handleConfirm}>
            Sim
        </button>
    )
}