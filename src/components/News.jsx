import { useLanguage } from "./LanguageContext.jsx";

export default function News() {
  const { t } = useLanguage();
  const newsT = t.news;

  return (
    <section className="news" id="actualites">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">{newsT.eyebrow}</p>
          <h2>{newsT.title}</h2>
        </div>

        <div className="news-list reveal">
          {newsT.items.map((item, idx) => (
            <article className="news-item" key={idx}>
              <div className="news-meta">
                <span className="news-date">{item.date}</span>
                {item.tag && <span className="news-tag">{item.tag}</span>}
              </div>
              <div className="news-content">
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                {item.readTime && <span className="news-readtime"><span className="material-symbols-rounded" aria-hidden="true">schedule</span>{item.readTime}</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
