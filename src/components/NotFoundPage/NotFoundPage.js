import "./NotFoundPage.css";

export function NotFoundPage({goBack, notFoundPageData}){
    return (
        <main className="not-foumd-page">
            <h1 className="not-found-page__title">{notFoundPageData.title}</h1>
            <h2 className="not-found-page__subTitle">{notFoundPageData.subTitle}</h2>
            <button onClick={goBack} className="not-found-page__button">{notFoundPageData.buttonText}</button>
        </main>
    )
}