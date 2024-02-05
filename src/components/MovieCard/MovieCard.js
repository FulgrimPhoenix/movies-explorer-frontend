import "./MovieCard.css";

export function MovieCard({ cardData, cellData }) {
  return (
    <li className="card">
      <div className="card__img-container">
        <div className="card__status-container">
          {true ? (
            <button className="card__save-button">
              {cellData.saveButtonText}
            </button>
          ) : (
            <img
              className="card__savedStatus"
              src={cellData.savedImg}
              alt="savedStatus"
            />
          )}
        </div>
        <picture>
          <source
            srcSet={cardData.imgSrcHQ}
            media="(min-width: 600px)"
            type="image/png"
          />
          <img className="card__img" src={cardData.imgSrc} alt={cardData.title} />
        </picture>
      </div>
      <div className="card__description">
        <p className="card__title">{cardData.title}</p>
        <div className="card__duration-container">
          <p className="card__duration-time">{cardData.duration}</p>
        </div>
      </div>
    </li>
  );
}
