import { projectConstants } from "../../utils/constants";
import "./AboutProject.css";

export function AboutProject({ aboutProjectData }) {
  return (
    <section id="about-project" className="about-project">
      <h2 className="section-title">{projectConstants.aboutProjectTimelineData.sectionTitle}</h2>
      <div className="about-project__container">
        
        <ul className="about-project__items">
          {aboutProjectData.map((aboutItem) => {
            return (
              <li key={aboutItem.title} className="about-project__item">
                <h3 className="about-project__item-title">{aboutItem.title}</h3>
                <p className="about-project__item-description">
                  {aboutItem.description}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="about-project__timeline-container">
          <div className="about-project__timeline-item about-project__timeline-item_dark-theme">
            <p className="about-project__timeline-text about-project__timeline-text_dark-theme">
              {projectConstants.aboutProjectTimelineData.firstTimeline}
            </p>
          </div>
          <div className="about-project__timeline-item">
            <p className="about-project__timeline-text">{projectConstants.aboutProjectTimelineData.secondTimeline}</p>
          </div>
          <h6 className="about-project__timeline-title">{projectConstants.aboutProjectTimelineData.firstTimelineText}</h6>
          <h6 className="about-project__timeline-title">{projectConstants.aboutProjectTimelineData.secondTimelineText}</h6>
        </div>
      </div>
    </section>
  );
}
