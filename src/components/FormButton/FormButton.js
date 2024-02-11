export function FormButton({buttonStyle, isButtonActive, onClick, buttonText}){
  return(
    isButtonActive ? (
      <button
      type="submit"
        className={`${buttonStyle}`}
      >
        {buttonText}
      </button>
    ) : (
      <button
      type="submit"
        className={`${buttonStyle}`}
        disabled
      >
        {buttonText}
      </button>
    )
  )
}