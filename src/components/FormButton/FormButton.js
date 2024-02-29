export function FormButton({ buttonStyle, isButtonActive, onClick, buttonText, isFormActive }) {
  return (
    isButtonActive ? (
      <button
        type="submit"
        className={`${buttonStyle}`}
        disabled={(isFormActive) ? "" : "disabled"}
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