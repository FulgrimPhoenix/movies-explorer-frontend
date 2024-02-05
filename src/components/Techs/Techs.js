import "./Techs.css";

export function Techs({ techsList, techsData }) {
  return (
    <section id="techs" className="techs">
      <h3 className="section-title">Технологии</h3>
      <div className="techs__container">
        <h2 className="techs__title">
          {techsData.title}
        </h2>
        <p className="techs__description">
          {techsData.description}
        </p>
        <ul className="techs-grid">
          {techsList.map((item) => {
            return (
              <li key={item} className="techs-grid__cell">
                <p className="techs-grid__cell-content">{item}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
