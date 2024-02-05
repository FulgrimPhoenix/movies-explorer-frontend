import { AboutMe } from "../AboutMe/AboutMe.js";
import { AboutProject } from "../AboutProject/AboutProject.js";
import { Portfolio } from "../Portfolio/Portfolio.js";
import { Techs } from "../Techs/Techs.js";
import "./Main.css";

export function Main({ projectConstants }) {
  return (
    <section className="main">
      <div className="intro">
        <h1 className="intro__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
      <div className="menu">
        <nav className="menu__list">
          <a href="#about-project" className="menu__list-item">
            О проекте
          </a>
          <a href="#techs" className="menu__list-item">
            Технологии
          </a>
          <a href="#about-me" className="menu__list-item">
            Студент
          </a>
        </nav>
      </div>
      <AboutProject aboutProjectData={projectConstants.aboutProjectData} />
      <Techs
        techsList={projectConstants.techsData.techsList}
        techsData={projectConstants.techsData}
      />
      <AboutMe AboutMeData={projectConstants.AboutMeData} />
      <Portfolio portfolioData={projectConstants.portfolioData} />
    </section>
  );
}
