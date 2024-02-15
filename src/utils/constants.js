import myPhoto from "../images/myPhoto.jpg";
import searchIcon from "../images/search-icon.svg";
import savedImg from "../images/savedImg.svg";
import logo from "../images/logo.svg";
import accauntImgPink from "../images/headerLogo.svg";
import accauntImg from "../images/headerLogoForAll.svg";
import navBarIcon from "../images/menuNavBarIcon.svg";
import exitButton from "../images/exit.svg";
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
    accauntImgPink: accauntImgPink,
    accauntImg: accauntImg,
    logo: logo,
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
    name: "Илья",
    specialization: "Фронтенд-разработчик, 25 лет",
    aboutMe:
      "Я родился в Ивантеевке, но сейчас живу в Мытищах. Закончил аэрокосмический факультет МАИ на инженера-конструктора. Я большой любитель настольных (особенно Warhammer 40000 и D&D) и компьютерных игр. Всю жизнь я чувствовал предрасположенность к IT разработке, но лишь в 2022 году решил заняться этим серьезно и поступил на курс Веб-разработчика. После выпуска планирую немного поработать во фрилансе, а как поднаберусь опыта - постараюсь устроить в крупную компанию на постоянную основу (Оособенно сильно хочу пополнить ряды разработчиков Яндекс).",
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
    alt_search_icon: "иконка поиска",
    button_text: "Найти",
    checkbox_title: "Короткометражки",
  },
  moviesData: {
    movieList: [
      // {
      //   imgSrcHQ: slova_o_disaineHQ,
      //   imgSrc: slova_o_disaineLQ,
      //   title: "33 слова о дизайне",
      //   duration: "1ч 17м",
      // },
      // {
      //   imgSrcHQ: kinoalmanaxHQ,
      //   imgSrc: kinoalmanaxLQ,
      //   title: "Киноальманах «100 лет дизайна»",
      //   duration: "1ч 17м",
      // },
      // {
      //   imgSrcHQ: v_pogone_za_BenksiHQ,
      //   imgSrc: v_pogone_za_BenksiLQ,
      //   title: "В погоне за Бенкси",
      //   duration: "1ч 17м",
      // },
      // {
      //   imgSrcHQ: slova_o_disaineHQ,
      //   imgSrc: slova_o_disaineLQ,
      //   title: "33 слова о дизайне1",
      //   duration: "1ч 17м",
      // },
      // {
      //   imgSrcHQ: kinoalmanaxHQ,
      //   imgSrc: kinoalmanaxLQ,
      //   title: "Киноальманах «100 лет дизайна»1",
      //   duration: "1ч 17м",
      // },
      // {
      //   imgSrcHQ: v_pogone_za_BenksiHQ,
      //   imgSrc: v_pogone_za_BenksiLQ,
      //   title: "В погоне за Бенкси1",
      //   duration: "1ч 17м",
      // },
    ],
    staticData: {
      saveButtonText: "Сохранить",
      savedImg: savedImg,
    },
  },
  registerFormData: {
    logo: logo,
    title: "Добро пожаловать!",
    buttonText: "Зарегистрироваться",
    redirectLine: "Уже зарегестрированы?",
    redirectLink: "/signin",
    redirectText: "Войти",
  },
  loginFormData: {
    logo: logo,
    title: "Рады видеть!",
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
    accauntImg: accauntImg,
  },
  notFoundPageData: {
    title: "404",
    subTitle: "Страница не найдена",
    buttonText: "Назад",
  },
};
