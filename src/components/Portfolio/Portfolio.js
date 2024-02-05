import './Portfolio.css';

export function Portfolio({portfolioData}){
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>{portfolioData.sectionTitle}</h3>
      <nav className='portfolio__list'>
        {portfolioData.projects.map((project) => {
          return (
            <a key={project.title} href={project.link} target='blank' rel="noreferrer" className='portfolio__list-item'>
              <h4 className='portfolio__item-title'>{project.title}</h4>
              <p className='portfolio__item-icon'>{portfolioData.menuIcon}</p>
            </a>
          )
        })}
      </nav>
    </section>
  )
}