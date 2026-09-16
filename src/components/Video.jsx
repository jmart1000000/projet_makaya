import { useState } from "react";
import { useLanguage } from "./LanguageContext.jsx";

export default function Video() {
  const { t } = useLanguage();
  const videoT = t.video || {};

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="video-section" id="publications">
      {/* Section Header */}
      <div className="wrap">
        <div className="section-head text-center reveal">
          <p className="eyebrow">{videoT.eyebrow || "RESSOURCES & PUBLICATIONS"}</p>
          <h2 className="video-title">
            Des ressources pour <span className="accent-word">comprendre & agir</span>.
          </h2>
          <div className="title-accent-bar mx-auto" style={{ margin: "16px auto 20px" }} aria-hidden="true" />
          <p className="section-lead">{videoT.text || "Découvrez nos récits de terrain, notes d’information et contenus de sensibilisation."}</p>
        </div>
      </div>

      {/* Full-width Video Container with HOPE play overlay */}
      <div className="video-fullwidth-wrapper reveal">
        {!isPlaying ? (
          <div className="video-poster-overlay" onClick={() => setIsPlaying(true)}>
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=85"
              alt="Action communautaire MAKAYA"
              className="video-poster-img"
            />
            <div className="video-poster-scrim" />
            <button
              type="button"
              className="video-play-btn"
              aria-label="Lancer la vidéo"
            >
              <span className="material-symbols-rounded">play_arrow</span>
            </button>
            <div className="video-corner-watermark" aria-hidden="true">
              MAKAYA
            </div>
          </div>
        ) : (
          <div className="video-fullwidth-frame">
            <iframe
              src={`${videoT.embedUrl}?autoplay=1`}
              title={videoT.title || "Vidéo MAKAYA"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
