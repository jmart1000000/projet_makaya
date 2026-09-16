import { useEffect, useState, useRef } from "react";
import { useLanguage } from "./LanguageContext.jsx";

function CountUp({ end, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const duration = 1800; // ms
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, end]);

  return (
    <span ref={ref} className="stat-number">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ImpactStats({ onOpenDonate }) {
  const { t } = useLanguage();
  const impactT = t.impact;

  return (
    <section className="impact-section" id="impact">
      <div className="wrap">
        <div className="section-head reveal text-center">
          <p className="eyebrow">{impactT.eyebrow}</p>
          <h2>{impactT.title}</h2>
          <p className="section-lead">{impactT.lead}</p>
        </div>

        <div className="stats-grid reveal">
          {impactT.stats.map((stat, idx) => (
            <div className="stat-card" key={idx}>
              <div className="stat-icon-wrap">
                <span className="material-symbols-rounded" aria-hidden="true">
                  {stat.icon}
                </span>
              </div>
              <CountUp end={stat.value} suffix={stat.suffix || "+"} />
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Campaign Goal Bar */}
        <div className="campaign-banner reveal">
          <div className="campaign-info">
            <span className="badge-live">● EN COURS</span>
            <h3>{impactT.campaignTitle}</h3>
            <p>{impactT.campaignDesc}</p>
          </div>
          <div className="campaign-progress-wrap">
            <div className="progress-labels">
              <span>Collecté : <strong>${impactT.raised.toLocaleString()}</strong></span>
              <span>Objectif : <strong>${impactT.target.toLocaleString()}</strong></span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${impactT.raisedPercent}%` }}
              >
                <span className="progress-tip">{impactT.raisedPercent}%</span>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={onOpenDonate}>
              Contribuer à la campagne
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
