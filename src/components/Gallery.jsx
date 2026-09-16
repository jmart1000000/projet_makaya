import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext.jsx";

export default function Gallery() {
  const { t } = useLanguage();
  const galleryT = t.gallery;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const mosaicItems = Array.from({ length: 13 }, (_, i) => ({
    slide: galleryT.slides[i % galleryT.slides.length],
    index: i % galleryT.slides.length,
  }));

  useEffect(() => {
    const onKey = (event) => {
      if (lightboxIndex === null) return;
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % galleryT.slides.length);
      if (event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + galleryT.slides.length) % galleryT.slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, galleryT.slides.length]);

  return (
    <section className="gallery" id="galerie">
      <div className="gallery-shell reveal">
        <div className="gallery-topline">
          <p className="gallery-mark">✳ <span>MAKAYA</span></p>
          <a href="#contact">Nous contacter <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span></a>
        </div>

        <div className="gallery-mosaic" aria-label="Galerie de nos activités">
          {mosaicItems.map(({ slide, index }, itemIndex) => (
            <button
              className={`gallery-tile tile-${itemIndex + 1}`}
              key={`${slide.caption}-${itemIndex}`}
              onClick={() => setLightboxIndex(index)}
              aria-label={`Agrandir : ${slide.alt}`}
            >
              <img src={slide.src} alt={slide.alt} />
              <span className="material-symbols-rounded" aria-hidden="true">zoom_in</span>
            </button>
          ))}
        </div>

        <div className="gallery-bottomline">
          <h2><span>Nos</span> instants<br />partagés</h2>
          <div>
            <p>{galleryT.lead}</p>
            <a className="gallery-cta" href="#contact">Découvrir nos actions <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span></a>
          </div>
          <h2 className="gallery-bottom-right">au cœur des<br /><span>communautés</span></h2>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox-backdrop" onClick={() => setLightboxIndex(null)}>
          <div className="lightbox-modal" onClick={(event) => event.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Fermer"><span className="material-symbols-rounded" aria-hidden="true">close</span></button>
            <img src={galleryT.slides[lightboxIndex].src} alt={galleryT.slides[lightboxIndex].alt} className="lightbox-img" />
            <div className="lightbox-caption"><p>{galleryT.slides[lightboxIndex].caption}</p></div>
            <button className="lightbox-nav prev" onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryT.slides.length) % galleryT.slides.length)} aria-label="Photo précédente"><span className="material-symbols-rounded" aria-hidden="true">arrow_back</span></button>
            <button className="lightbox-nav next" onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryT.slides.length)} aria-label="Photo suivante"><span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span></button>
          </div>
        </div>
      )}
    </section>
  );
}
