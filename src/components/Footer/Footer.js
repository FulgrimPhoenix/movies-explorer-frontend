import "./Footer.css";

export function Footer({ footerData }) {
  return (
    <footer className="footer">
      <h3 className="footer__main-info">{footerData.mainInfo}</h3>
      <div className="footer__container">
        <p className="footer__signature">{footerData.signature}</p>
        <nav className="footer__links">
          {footerData.links.map((item) => {
            return (
              <a key={item.title} className="footer__link" href={item.link} target="blank">
                {item.title}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
