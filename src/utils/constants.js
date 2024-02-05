import myPhoto from "../images/myPhoto.jpg";
import searchIcon from "../images/search-icon.svg";
import savedImg from "../images/savedImg.svg";
import logo from "../images/logo.svg";
import legacyLogo from "../images/logo.png";
import headerAccauntImgPink from "../images/headerLogo.png";
import headerLegacyAccauntImgPink from "../images/headerLogo.png";
import headerAccauntImg from "../images/headerLogoForAll.svg";
import headerLegacyAccauntImg from "../images/headerLogoForAll.png";
import navBarIcon from "../images/menuNavBarIcon.svg";
import exitButton from "../images/exit.svg"
//HQ picture
import slova_o_disaineHQ from "../images/movieList/33_slova_o_disaine.png";
import kinoalmanaxHQ from "../images/movieList/Kinoalmanax.png";
import v_pogone_za_BenksiHQ from "../images/movieList/V_pogone_za_Benksi.png";
//LQ picture
import slova_o_disaineLQ from "../images/movieList/33_slova_o_disaine.jpg";
import kinoalmanaxLQ from "../images/movieList/Kinoalmanax.jpg";
import v_pogone_za_BenksiLQ from "../images/movieList/V_pogone_za_Benksi.jpg";

export const projectConstants = {
  headerData: {
    accauntImgPink: headerLegacyAccauntImgPink,
    legacyAccauntImgPink: headerLegacyAccauntImgPink,
    accauntImg: headerLegacyAccauntImg,
    legacyAccauntImg: headerLegacyAccauntImg,
    logo: logo,
    legacyLogo: headerLegacyAccauntImgPink,
    navBarIcon: navBarIcon,
  },
  aboutProjectData: [
    {
      title: "Дипломный проект включал 5 этапов",
      description:
        "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.",
    },
    {
      title: "На выполнение диплома ушло 5 недель",
      description:
        "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.",
    },
  ],
  techsData: {
    title: "7 технологий",
    description:
      "На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.",
    techsList: ["HTML", "CSS", "JS", "React", "Git", "Express.js", "MongoDB"],
  },
  AboutMeData: {
    sectionTitle: "Студент",
    name: "Виталий",
    specialization: "Фронтенд-разработчик, 30 лет",
    aboutMe:
      "Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.",
    photo: myPhoto,
  },
  portfolioData: {
    sectionTitle: "Портфолио",
    menuIcon: "↗",
    projects: [
      {
        title: "Статичный сайт",
        link: "https://fulgrimphoenix.github.io/how-to-learn/",
      },
      {
        title: "Адаптивный сайт",
        link: "https://fulgrimphoenix.github.io/russian-travel/",
      },
      {
        title: "Одностраничное приложение",
        link: "https://garazhelka.nomoredomainsmonster.ru/",
      },
    ],
  },
  footerData: {
    signature: "Ivanyuschin Ilia © 2020",
    mainInfo: "Учебный проект Яндекс.Практикум х BeatFilm.",
    links: [
      { title: "Яндекс.Практикум", link: "https://practicum.yandex.ru/" },
      { title: "Github", link: "https://github.com/" },
    ],
  },
  formSearchUtils: {
    search_icon: searchIcon,
    alt_search_icon: "search icon",
    button_text: "Найти",
    checkbox_title: "Короткометражки",
  },
  moviesData: {
    movieList: [
      {
        imgSrcHQ: slova_o_disaineHQ,
        imgSrc: slova_o_disaineLQ,
        title: "33 слова о дизайне",
        duration: "1ч 17м",
      },
      {
        imgSrcHQ: kinoalmanaxHQ,
        imgSrc: kinoalmanaxLQ,
        title: "Киноальманах «100 лет дизайна»",
        duration: "1ч 17м",
      },
      {
        imgSrcHQ: v_pogone_za_BenksiHQ,
        imgSrc: v_pogone_za_BenksiLQ,
        title: "В погоне за Бенкси",
        duration: "1ч 17м",
      },
      {
        imgSrcHQ: slova_o_disaineHQ,
        imgSrc: slova_o_disaineLQ,
        title: "33 слова о дизайне1",
        duration: "1ч 17м",
      },
      {
        imgSrcHQ: kinoalmanaxHQ,
        imgSrc: kinoalmanaxLQ,
        title: "Киноальманах «100 лет дизайна»1",
        duration: "1ч 17м",
      },
      {
        imgSrcHQ: v_pogone_za_BenksiHQ,
        imgSrc: v_pogone_za_BenksiLQ,
        title: "В погоне за Бенкси1",
        duration: "1ч 17м",
      },
    ],
    staticData: {
      saveButtonText: "Сохранить",
      savedImg: savedImg,
    },
  },
  registerFormData: {
    logo: logo,
    legacyLogo: legacyLogo,
    title: "Добро пожаловать!",
    buttonText: "Зарегистрироваться",
    redirectLine: "Уже зарегестрированы?",
    redirectLink: "/signin",
    redirectText: "Войти",
  },
  loginFormData: {
    logo: logo,
    legacyLogo: legacyLogo,
    title: "Рады видеть",
    buttonText: "Войти",
    redirectLine: "Ещё не зарегестрированы?",
    redirectLink: "/signup",
    redirectText: "Регистрация",
  },
  profileData: {
    title: (name) => {
      return `Привет, ${name}!`;
    },
  },
  popupData: {
    exitButton: exitButton,
    accauntImg: headerLegacyAccauntImg
  },
  notFoundPageData: {
    title: "404",
    subTitle: "Страница не найдена",
    buttonText: "Назад"
  }
};
