import "./AboutProject.css";

export function AboutProject({ aboutProjectData }) {
  return (
    <section id="about-project" className="about-project">
      <h3 className="section-title">О проекте</h3>
      <div className="about-project__container">
        
        <ul className="about-project__items">
          {aboutProjectData.map((aboutItem) => {
            return (
              <li key={aboutItem.title} className="about-project__item">
                <h4 className="about-project__item-title">{aboutItem.title}</h4>
                <p className="about-project__item-description">
                  {aboutItem.description}
                </p>
              </li>
            );
          })}
        </ul>
        {/* Try to refactor table architecture */}
        <div className="about-project__timeline-container">
          <div className="about-project__timeline-item about-project__timeline-item_dark-theme">
            <p className="about-project__timeline-text about-project__timeline-text_dark-theme">
              1 неделя
            </p>
          </div>
          {/* add constants to the shared file */}
          <div className="about-project__timeline-item">
            <p className="about-project__timeline-text">4 недели</p>
          </div>
          <h6 className="about-project__timeline-title">Back-end</h6>
          <h6 className="about-project__timeline-title">Front-end</h6>
        </div>
      </div>
    </section>
  );
}
