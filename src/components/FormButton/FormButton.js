export function FormButton({buttonStyle, isButtonActive, onClick, buttonText}){
  return(
    isButtonActive ? (
      <button
        onClick={onClick}
        className={`${buttonStyle}`}
      >
        {buttonText}
      </button>
    ) : (
      <button
        onClick={onClick}
        className={`${buttonStyle}`}
        disabled
      >
        {buttonText}
      </button>
    )
  )
}