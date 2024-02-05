import "./AboutMe.css";

export function AboutMe({ AboutMeData }) {
  return (
    <section id="about-me" className="about-me">
      <h3 className="section-title">{AboutMeData.sectionTitle}</h3>
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__title">{AboutMeData.name}</h2>
          <h4 className="about-me__subtitle">{AboutMeData.specialization}</h4>
          <p className="about-me__myInfo">{AboutMeData.aboutMe}</p>
          <a
            className="about-me__myRef"
            href="https://github.com/FulgrimPhoenix"
            target="blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          src={AboutMeData.photo}
          alt="myPhoto"
        />
      </div>
    </section>
  );
}
